import nodemailer from 'nodemailer';

const { SMTP_HOST, SMTP_PORT, SMTP_SERVICE, SMTP_MAIL, SMTP_PASSWORD } = process.env;

export default async function handler(req: any, res: any) {
    if (req.method === 'POST') {
        const { name, email, phone, message } = req.body;

        // 创建邮件传输器
        const transporter = nodemailer.createTransport({
            host: SMTP_HOST,
            port: Number(SMTP_PORT),
            secure: true, // true for 465, false for other ports
            auth: {
                user: SMTP_MAIL,
                pass: SMTP_PASSWORD, 
            },
        });

        // 邮件选项
        const mailOptions = {
            from: '738234123@qq.com',
            to: '738234123@qq.com',
            subject: `新咨询来自 ${name}`,
            text: `姓名: ${name}\n邮箱: ${email}\n电话: ${phone}\n消息: ${message}`,
        };

        try {
            await transporter.sendMail(mailOptions);
            res.status(200).json({ message: '邮件发送成功' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: '邮件发送失败' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
} 