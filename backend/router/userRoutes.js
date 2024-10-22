//importing modules
import express from 'express'
import { getAllUsers, signup, login, logout, sendPasswordResetMail, resetPassword } from '../controllers/userController.js';
import userAuth from '../middleware/userAuth.js'
import { body } from 'express-validator';
import validate from '../middleware/validate.js';
const router = express.Router()
// app.post('/register', userAuth.saveUser, signup)
// app.post('/login', login)

router.get('/all', getAllUsers)
router.post('/register',
    body('name')
        .notEmpty()
        .withMessage('名前を入力してください')
        .escape(),
    body('email')
        .notEmpty()
        .withMessage('メールアドレスを入力してください')
        .isEmail()
        .withMessage('メールアドレスの形式で入力してください')
        .escape(),
    body('password')
        .notEmpty()
        .withMessage('パスワードを入力してください')
        .isLength({ min: 9, max: 20 })
        .withMessage('パスワードは9文字以上20文字以内で入力してください')
        .escape(),
    body('password_confirmation')
        .notEmpty()
        .withMessage('確認用パスワードを入力してください')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('パスワードが一致していません');
            }
            return true;
        })
        .escape(),
    body('user_type')
        .notEmpty()
        .withMessage('ユーザータイプを指定してください'),
    validate,
    // userAuth,
    signup)
router.post('/login', body('email')
    .notEmpty()
    .withMessage('メールアドレスを入力してください')
    .custom((value, { req }) => {
        if (value !== req.body.email) {
            throw new Error('メールアドレスが一致していません');
        }
        return true;
    })
    .escape(),
    body('password')
        .notEmpty()
        .withMessage('パスワードを入力してください')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('パスワードが一致していません');
            }
            return true;
        })
        .escape(),
    login)

//    router.get('/email-verification', )

// router.post('/forgot-password', forgotPassword);

router.post('/send-reset-password-mail', sendPasswordResetMail);

router.post(
    '/reset-password',
    body('password')
        .notEmpty()
        .withMessage('確認用パスワードを入力してください')
        .isLength({ min: 9, max: 20 })
        .withMessage('パスワードは9文字以上20文字以内で入力してください')
        .escape(),
    body('password_confirmation')
        .notEmpty()
        .withMessage('確認用パスワードを入力してください')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('パスワードが一致していません');
            }
            return true;
        })
        .escape(),
    resetPassword
);

router.post('/logout', logout);

export default router