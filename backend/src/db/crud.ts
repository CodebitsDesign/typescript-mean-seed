import {database} from "./connect";
import * as mongo from 'mongodb'

export function crudRead(id:string, collectionName: string, cb:(err, item?) => void) {
  database.collection(collectionName, (err, collection) => {
    if (err) return cb(err);
    collection.findOne({"_id": new mongo.ObjectID(id)}, (err, result) => {
      if (err) return cb(err);
      return cb(null, result);
    })
  })
}


export function crudCreate(item: Object, collectionName: string, cb:(err, item?) => void) {

  database.collection(collectionName, (err, collection) => {
    if (err) return cb(err);
    collection.insertOne(item, (err, result) => {
      if (err) return cb(err);
      return cb(null, result);
    })
  })

}

export function crudUpdate(item, collectionName: string, cb:(err, item?) => void) {
  database.collection(collectionName, (err, collection) => {
    if (err) return cb(err);

    collection.updateOne({"_id": new mongo.ObjectID(item._id)}, item, (err, result) => {
      if (err) return cb(err);
      return cb(null, result);
    })
  })
}

export function crudDelete(id: string, collectionName: string, cb:(err, item?) => void) {
  database.collection(collectionName, (err, collection) => {
    if (err) return cb(err);

    collection.deleteOne({"_id": new mongo.ObjectID(id)}, (err, result) => {
      if (err) return cb(err);
      return cb(null, result);
    })
  })
}