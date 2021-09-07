const express = require("express");

class SharingRouter {
    constructor(sharingService){
        this.sharingService = sharingService;
    }

    router(){
        let router = express.Router();

        router.post("/", this.post.bind(this));
        router.delete("/", this.delete.bind(this));
    }

    post(req, res){
        console.log("Post request to add user to set");

        return this.sharingService.add(req.body)
        .catch((err) => {
            return res.status(500).json(err);
        }); 
    }
    
    delete(req, res){
        console.log("Delete request to delete user permission to set");

        return this.sharingService.delete(req.body)
        .catch((err) => {
            return res.status(500).json(err);
        });
    }

}