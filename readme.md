clerk provide  user data, to get that user data from clerk we use clerk web hooks.

to efficiently manage clerk web hooks scheduling & chron jobs we use inngest(provides multiple features to manage batch processing,queuing,background jobs,scheduling jobs,chron jobs)

gitignore is for  these files are not uploading in github

To upload images online we use imagekit(it is an image and video API. using this we can upload and optimize our images   )

inngest: system to runs backgrounds jobs



config/db := db connection layer of backend. make connection with mongoDB db + connect to db when server is start + handle success/failure connection 

 imageKit:= Thirs-party config file
 multer:= middleware which handles multipart/form-data. file upload handling config. receives files from ft+stores temporary+attach req to obj
 nodeMailer:= configs email sending system of bk. send email to user(otp,verfication,pass rest,notifi) + connect to smtp(simple mail tranfer protocol) server + provide reusable email service
 BREVO:- bulk, transactional, marketing emails+ smtp relay