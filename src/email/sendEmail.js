import nodemailer from "nodemailer"
import { emailTemp } from "./emailTemp.js";

export const sendEmail = async (options)=>{
    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: "test011524@gmail.com",
          pass: "rbmfawkhxwjrrfle",
        },
      })
    
        // send mail with defined transport object
        const info = await transporter.sendMail({
          from: '"Fred Foo 👻" <test011524@gmail.com>', // sender address
          to: options.email, // list of receivers
          subject: "Hello ✔", // Subject line
          text: "Hello world?", // plain text body
          html: emailTemp(options.api), // html body
        });
      
        console.log("Message sent: %s", info.messageId);
    
      
      
}
