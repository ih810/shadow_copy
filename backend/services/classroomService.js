class ClassroomService {
  constructor(knex) {
    this.knex = knex;
  }

  //Method to add classroom
  add(body) {
    console.log("Adding Classroom");
    return this.knex("user")
      .where({
        email: body.email,
        
      })
      .then((email) => {
        console.log(email)
        return this.knex
          .insert({
            user_id: email[0].id,
            classroomTitle: body.title,
            classroomDesc: body.description,
            classroomStatus: true
          })
          .into("classroom")
          .returning("id")
      });
  }

  //Method to edit classroom
  edit(body) {
    console.log("Editing a classroom");
    return this.knex("classroom").where("id", body.classroomId).update({
      classroomTitle: body.title,
      classroomDesc: body.desc,
    });
  }

  //Method to delete classroom
  delete(body) {
    console.log("Deleting a classroom");
    return this.knex("classroom").where("id", body.classroomId).update({
      classroomStatus: false,
    });
  }

  //Method to list all data of a specific classroom
  classroom(body) {
    console.log("Listing data of a specific classroom");
    let data = {};
    return this.knex("classroom")
      .select(
        "classroom.id",
        "classroom.classroomTitle",
        "classroom.classroomDesc"
      )
      .where("id", body.classroomId)
      .then((classroom) => {
          data.id = classroom[0].id
          data.title = classroom[0].classroomTitle
          data.description = classroom[0].classroomDesc
      })
      .then(() => {
        return this.knex("tag_classroom")
          .where("classroom_id", body.classroomId)
          .join("tag", "tag_classroom.tag_id", "tag.id")
          .select("tag.tagBody", "tag.id")
      })
      .then((tags) => {
        data.tags = tags.map((tag) => {
          return {
            id: tag.id,
            body: tag.body,
          };
        });
      })
      .then(() => {
        return this.knex("classroom_user")
          .where("classroom_user.classroom_id", body.classroomId)
          .join("user", "classroom_user.sharedUser_id", "user.id")
          .select("user.id", "user.email", "user.displayName")
      })
      .then((shared) => {
        return (data.shared = shared.map((user) => {
          return {
            id: user.id,
            email: user.email,
            displayName: user.displayName
          };
        }));
      })
      .then(() => {
        return this.knex("classroom_set")
        .where("classroom_set.classroom_id", body.classroomId)
        .select("classroom_set.set_id")
      }).then((sets) => {
        data.bridge = sets.map((set) => {
          return{
            set_id: set.set_id
          }
        })
      })
      .then(() => {
        return data
      })
  }

  async list (body) {
    console.log("Listing all classrooms of a user");
    let user_id = await this.knex("user").where({
      email: body.email
    }).select("id");
    
    const data = {};

    return this.knex("classroom")
    // .join("classroom_user", "classroom.id", "classroom_user.classroom_id")
    .where("classroom.classroomStatus", true)
    .where("classroom.user_id", user_id[0].id)
    // .andWhere(function () {
      // this.where("classroom.user_id", "=", user_id[0].id).orWhere("classroom_user.sharedUser_id", user_id[0].id)
    // }) 
    .select("classroom.id")
    .then(async (classrooms) => {
      let allClass = await Promise.all(classrooms.map((classroom) => {
        let data = {}
        return this.knex("classroom")
          .select(
            "classroom.id",
            "classroom.classroomTitle",
            "classroom.classroomDesc"
          )
          .where("id", classroom.id)
          .then((classroom) => {
              data.id = classroom[0].id
              data.title = classroom[0].classroomTitle
              data.description = classroom[0].classroomDesc
          })
          .then(() => {
            return this.knex("tag_classroom")
              .where("classroom_id", data.id)
              .join("tag", "tag_classroom.tag_id", "tag.id")
              .select("tag.tagBody", "tag.id")
          })
          .then((tags) => {
            data.tags = tags.map((tag) => {
              return {
                id: tag.id,
                body: tag.tagBody,
              };
            });
          })
          .then(() => {
            return this.knex("classroom_user")
              .join("user", "classroom_user.sharedUser_id", "user.id")
              .where("classroom_user.classroom_id", data.id)
              .select("user.id", "user.email", "user.displayName")
          })
          .then((shared) => {
            return (data.shared = shared.map((user) => {
              return {
                id: user.id,
                email: user.email,
                displayName: user.displayName,
                picture: user.picture
              };
            }));
          })
          .then(() => {
            return this.knex("classroom_set")
            .where("classroom_set.classroom_id", data.id)
            .select("classroom_set.set_id")
          }).then((sets) => {
            data.bridge = sets.map((set) => {
              return{
                set_id: set.set_id
              }
            })
          })
          .then(()=>{
            return data
          })
        }))
        return allClass
      })
  }
}



module.exports = ClassroomService;

