import axios from "axios";

export const ADD_CLASSROOM = "ADD_CLASSROOM";
export const EDIT_CLASSROOM = "EDIT_CLASSROOM";
export const DELETE_CLASSROOM = "DELETE_CLASSROOM";

export const addClassroom = (classroom) => async (dispatch) => {
    console.log("adding classroom", classroom)

   const { data } = await axios.post("http://localhost:8080/api/classroom", classroom)
   console.log("this is the post return", data)
    dispatch({type: ADD_CLASSROOM, payload: {id: classroom.id, description: classroom.description, title: classroom.title}});
}

export const editClassroom = (classroom) => async (dispatch) => {
    console.log("editing classroom")

   const { data } = await axios.put("http://localhost:8080/api/classroom", classroom)
   
    dispatch({type: EDIT_CLASSROOM, payload: {classroom_id: classroom.classroomId, description: classroom.description, title: classroom.title}});
}

export const deleteClassroom = (classroom) => async (dispatch) => {
    console.log("deleting classroom")

   const { data } = await axios.delete("http://localhost:8080/api/classroom", classroom)
   
    dispatch({type: DELETE_CLASSROOM, payload: {classroom_id: classroom.classroomId, description: classroom.description, title: classroom.title}});
}
