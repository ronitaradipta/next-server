const multer = require('multer');
const path = require('path');
// const FirebaseStorage = require('multer-firebase-storage')
const FirebaseStorage = require('multer-firebase-sharp')
const sharp = require('sharp')


const storage = multer.diskStorage({
  // destination: (req, file, cb) => {
  //   cb(null, 'Images');
  // },
  filename: (req, file, cb) => {
    const now = Date.now();
    req.uploadName = now + path.extname(file.originalname);
    req.formatWebp = now + '.webp';
    cb(null, req.uploadName);
  },
});
// const imagePath = req.uploadName;
// const formatWebp =  req.formatWebp;
// const filename = () =>{
//   const now = Date.now();
//   req.uploadName = now + path.extname(file.originalname);
//   req.formatWebp = now + '.webp';
//   cb(null, req.uploadName);
// }
const upload = multer({
  storage:   
    FirebaseStorage({
    bucketName: "gs://nextcommers-14992.appspot.com",
    credentials: {
      clientEmail: "firebase-adminsdk-hk2uk@nextcommers-14992.iam.gserviceaccount.com",
      privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCrSkyq/0rJ9WJR\nRRAvWjXD7B6DTSLQbvyhVXzE/1ayEABmf7FQ/Z0xLN9FD3q6rFOnOUjT+GIXyeU0\nkWc5kiNJRjTq8s7ZTobq5j0KUhZMUAYHrrhG0SWC8JZQJY22+AcgYBy1Eq/+mMuu\nb1IcRvQ6KQupTlMymALOpb7zivY7YTrVnuXwBtjDHCdt2pO3uXhCJ45qxkVv6ECL\nndGLgAaXDfvvc0VbYAnvgttxs1xjnkqPVTvU144wZro1rQC2f3/eOPwI0GEd/Aiq\nXdrF5UbHv4+3KpFUpFSKVukNVOTxS01QQRhhnoox6Uaa0QWnw9xNqbiABqAbDgUy\nBODB2pkrAgMBAAECggEAEW5mOaCb7nbXoohHYApAyRy7njEOB0LELXGTA5kt1sEP\ndAmFSfCv5n6NL2ymg14Lb/ZsauXZVa0Tc4i4hdX8BqDrvF0pSllWHDbXT2Ll0gOd\nbtALq2lCn/32eKwvAnJgh0hAo6IF4arlpMK/YGaiw/3D/17GfgeU1uLBzpb9p90l\nEyyLKZ8pCA4PiV4cNtruqbupoke+w1TLnGkerPNqgsjH/aKGZT8t73EwKSGnqwrw\ndgxt/o1gCLi3BV02HCzCSi2KpMJma8ALnzT0qc0/NGbBMxxLwYD93cH+87RhwWRs\nZGc7BihwlkyvImV+jgOkOlYYr51o4QG8XMCwSvFoQQKBgQDjhdLb0QGz9IUde3wr\n/6S1aRIyKMZCRxZnc6pULDmUAonNroy9R+9fsTMBXH7F4EyTMwyJ1hOUVNCJiZyU\nE1u3/D+NiyMtZwyB4is5y/oozeIzyfIzemYf2470MB2edaSjnHAXJ7Z73j5QZsqv\n2iEU7YrrT0pO0+c8Gr1zAZYVrwKBgQDAurM66h0YqAkVIDauJ/4HwuJ2B2XRzoE6\nzNe7/NPtr092K52ZfFlOr1mXW6k/H2tGHQsFtnkaeyK9Lrdxf05rzOUU8Nd04s3f\n3PRZKvo6RCdAhnIJzD4GduX4vVtNBF7KHlXjijpMZ6FWC+1Ssz7KUbNpyQRBx7dq\n4FKzAtaPRQKBgCk8ifj5KpvZB39OcDTxQoL2piudJEHC7JaXahmTYmQnCZ7TsgJk\nVUg8r4fhocBvZLGRIQaiXC4YKSukW1KjJ45zE3mt7BRAhw3LVhZFl/NpTUQhp9oY\npwXDH2e2iMe9freAlPg9ZF+S6ixcVQQGPtSyMOlxF4Ct+0zzc76yXOdVAoGAS+F2\nLaz9VbbbFJlBTiJqzw148jWJbiibEtaR3e72Ve+fHoyfmU2vL960LHanVTX+m3VV\n4KLuXXG7xLZ+/U29R449Z5hHjDq8CfbJsc3NBWHN/oawoZDrnsnzU5LiPpmI5JU7\nBcJnn6txhxpdDyGJiEjQlcbSST/jxE2b4eUtKu0CgYEAwafH9/UaGC5iK2iYKdi2\nS1VBHED61iCghnozLyOpHcI3iXUnIfYcFNFipG4hI9aSK+5jFI6UqeRXDPT71qqA\nLeEppbSS7FgglDRV0R4hKqCUExoxoyyrIJV1xFk85HTFEepSKV3ObCWXVNw9rqAF\nEgjtnx7ULAo4sqP3Ku723So=\n-----END PRIVATE KEY-----\n",
      projectId: "nextcommers-14992"
    },
  }),
  limits: { fileSize: '1000000' },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));
    const now = Date.now();
    req.uploadName = now + path.extname(file.originalname);
    req.formatWebp = now + '.webp';
    cb(null, req.uploadName);
    if (mimeType && extname) {
      return cb(null, true);
    }
    cb('Give proper files formate to upload');
  },
});

module.exports = upload;
