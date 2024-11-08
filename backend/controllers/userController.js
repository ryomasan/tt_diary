//importing modules
import bcrypt from 'bcrypt';
import db from '../models/index.js';
import jwt from "jsonwebtoken";
import nodemailer from 'nodemailer';

// Assigning users to the variable User
const User = db.users;
const Blacklist = db.blacklistedTokens;
// Helper function to send emails
const sendEmail = async (to, subject, htmlContent) => {
    const transporter = nodemailer.createTransport({
        host: "maildev",
        port: 1025,
        tls: {
            rejectUnauthorized: false,
        },
    });

    const mailOptions = {
        from: 'ryo1030ma2@gmail.com',
        to,
        subject,
        html: htmlContent,
    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error) => {
            if (error) {
                console.error('Error sending email:', error);
                return reject('Error sending email');
            }
            resolve('Email sent successfully');
        });
    });
};

//signing a user up
export const getAllUsers = async (req, res) => {
    try {
        const response = await User.findAll();
        // console.log(response);
        if (response) {
            res.status(200).send(response);
        }
    } catch (error) {
        res.status(500).send('Error');
        console.log(error);
    }
};

export const signup = async (req, res) => {
    try {
        const { name, email, password, user_type } = req.body;
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({
                status: "failed",
                message: "このメールアドレスは既に使用されています",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword, user_type });

        if (user) {
            const token = jwt.sign({ id: user.id }, process.env.JWT_KEY, { expiresIn: '1d' });
            res.cookie("jwt", token, {
                maxAge: 1 * 24 * 60 * 60 * 1000,
                httpOnly: true,  // Prevents access from JavaScript (for security)
                sameSite: 'lax', // Allows cookie sharing on the same domain with different ports (or use 'none' with CORS)
                secure: false,   // Use true if you are testing on HTTPS
            });

            const redirectUrl = 'http://localhost:5173/login';
            const emailContent = `
                  <p>以下のURLをクリックして、ユーザー登録を完了してください</p>
                  <a href="${redirectUrl}">${redirectUrl}</a>
                 `;

            await sendEmail(email, 'ユーザー登録完了', emailContent)
            res.status(200).json({
                status: "success",
                message: "ご登録のメールアドレスに確認メールを送信しました。",
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

//login authentication
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        //find a user by their email
        const user = await User.findOne({
            where: {
                email: email
            }
        });

        //if user email is found, compare password with bcrypt
        if (user) {
            const isSame = await bcrypt.compare(password, user.password);

            //if password is the same
            //generate token with the user's id and the JWT_KEY in the env file
            if (isSame) {
                let payload = { id: user.id }
                let token = jwt.sign(payload, process.env.JWT_KEY, {
                    expiresIn: 1 * 24 * 60 * 60 * 1000,
                });

                //if password matches wit the one in the database
                //go ahead and generate a cookie for the user
                res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
                // console.log("user", JSON.stringify(user, null, 2));
                //send user data
                res.status(200).json({
                    status: "success",
                    message: "ログイン成功.",
                });
            } else {
                return res.status(401).json({
                    status: "failed",
                    data: [],
                    message:
                        "メールアドレスまたはパスワードが適切でありません",
                });
            }
        } else {
            return res.status(401).json({
                status: "failed",
                data: [],
                message:
                    "メールアドレスまたはパスワードが適切でありません",
            });
        }
    }
    catch (error) {
        console.log(error);
    }
}

export const sendPasswordResetMail = async (req, res) => {
    try {
        const { email } = req.body;
        //find a user by their email
        const user = await User.findOne({
            where: {
                email: email
            }
        });

        
        if (user) {
            const redirectUrl = 'http://localhost:5173/reset-password';
            const emailContent = `
                    <div>ご登録のメールアドレスにパスワード再設定用URLを送信しました。</div>
                    <div>メール内のリンクをクリックして、パスワード再設定を行なってください。</div>
                    <a href="${redirectUrl}">${redirectUrl}</a>
                    `
            await sendEmail(email, 'パスワード再設定用URLを送信しました', emailContent)
            res.status(200).json({
                status: "success",
                message: "パスワード再設定用URLを送信しました",
            });
        } else {
            return res.status(401).json({
                status: "failed",
                data: [],
                message:
                    "メールアドレスまたはパスワードが適切でありません",
            });
        }
    }
    catch (error) {
        console.log(error);
    }
}

export const resetPassword = async (req, res) => {
    try {
        const { password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.update({ password: hashedPassword });
        if (user) {
            res.status(200).json({
                status: "success",
                message: "パスワードが変更されました",
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};



export const logout = async (req, res) => {
    try {
        const authHeader = req.headers['cookie']; // get the session cookie from request header
        if (!authHeader) return res.sendStatus(204); // No content
        const cookie = authHeader.split('=')[1]; // If there is, split the cookie string to get the actual jwt token
        const accessToken = cookie.split(';')[0];
        const checkIfBlacklisted = await Blacklist.findOne({ where: { token: accessToken } }); // Check if that token is blacklisted
        // if true, send a no content response.
        if (checkIfBlacklisted) return res.sendStatus(204);
        // otherwise blacklist token
        // const newBlacklist = new Blacklist({
        //     token: accessToken,
        // });
        await Blacklist.create({ token: accessToken });
        // Also clear request cookie on client
        res.setHeader('Clear-Site-Data', '"cookies"');
        res.status(200).json({ message: 'You are logged out!' });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
        });
    }
}

// export default { signup, login }