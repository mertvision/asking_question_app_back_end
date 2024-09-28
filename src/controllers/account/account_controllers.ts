/**
 * Account controllers for account routes
 *
 * Author: Mert Özdemir <mertozdemircontact@icloud.com>
 */

// Importing our custom modules
import CustomError from "../../utils/error/CustomError"; // Custom error
import User from "../../schemes/user/user_schema"; // User schema
import ResetPassword from "../../schemes/reset_password/reset_password_schema"; // Reset password schema
import sendEmail from "../../lib/email/mail"; //  Send email lib
import {CryptoResetPassword} from "../../lib/crypto/crypto_reset_password"; // Cryptolib

// Importing third party modules
import {Request, Response, NextFunction } from "express";

// forgotAccountPassword
export const forgotAccountPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let email;

        if (!req.body.email) {
            return next(new CustomError("Please provide an e-mail address.", 400));
        } else if (req.body.email) {
            email = req.body.email;
        }

        const user = await User.findOne({ email: email });

        if (!user) {
            return next(new CustomError("There is no user with that e-mail", 404));
        };

        const {resetPasswordToken, resetPasswordTokenExpire} = await CryptoResetPassword._generateResetPasswordToken();

        const userResetPasswordDocument = await ResetPassword.findOne({ user_id: user.id });

        if (!userResetPasswordDocument) {
            return next(new CustomError("Please try again later.", 500));
        }

        userResetPasswordDocument.reset_password_token = resetPasswordToken;
        userResetPasswordDocument.reset_password_token_expire = resetPasswordTokenExpire;
        userResetPasswordDocument.save();

        const resetPasswordUrl = `http://localhost:3000/api/auth/resetPassword?resetPasswordToken=${resetPasswordToken}`;

        const resetPasswordEmail = `
        <h3>Reset Your Password</h3>
        <p>This <a href = '${resetPasswordUrl}' target = '_blank'>link</a>  will expire in 1 hour</p>
       `

        try {
            await sendEmail({
                from: process.env.SMTP_EMAIL as string,
                to: email,
                subject: "Reset Password Token",
                html: resetPasswordEmail
            });

            // JSON bilgisi
            return res.status(200).json({
                success: true,
                message: "Email Sent To Your Email",
            });
        } catch (err) {
            if (userResetPasswordDocument) {
                userResetPasswordDocument.reset_password_token = "";
                await userResetPasswordDocument.save();
            };

            return next(new CustomError("Email couldn't be sent", 500));
        };

    }
    catch (err) {
        return next(err);
    };
};

// resetAccountPassword function
export const resetAccountPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
       // still under development
    }
    catch (err) {

    };
};

// updateAccountInformations function
export const updateAccountInformations = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // still under development
    }
    catch (err) {

    }
};

