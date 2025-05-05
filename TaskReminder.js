const cron = require('node-cron');
const mysql = require('mysql2');
const moment = require('moment');
const axios = require('axios'); 
const nodemailer = require('nodemailer');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mona2002', 
  database: 'StudySync',  
  socketPath: '/Applications/XAMPP/xamppfiles/var/mysql/mysql.sock'
});

const sendEmail = async (toEmail, taskName) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
      user: 'studysyncplatform@gmail.com', 
      pass: 'xdzu agsw lhvm krbt', 
    },
  });

  const mailOptions = {
    from: 'studysyncplatform@gmail.com',
    to: toEmail,
    subject: `💪 تذكير بمهمتك: ${taskName}`,
    html: `
      <div style="direction: rtl; text-align: right; font-family: Tahoma; font-size: 16px;">
        <p>✨<strong> مرحباً!</strong></p>
        <br>
        <p>⏰ لديك تذكير لمهمة اليوم: ${taskName}</p>
        <p>🎯 لا تنسَ إتمام مهمتك.</p>
      </div>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Reminder sent to: ${toEmail}`, info);
  } catch (error) {
    console.error(`Failed to send to ${toEmail}:`, error);
  }
};

cron.schedule('07 18 * * *', () => {
  console.log('Running cron job to check tasks for reminders');

  const tasksUrl = 'http://localhost/php_server/tasks.php';

  axios.get(tasksUrl)
    .then(response => {
      const tasks = response.data;

      tasks.forEach(task => {
        const taskDate = moment(task.date); 
        const currentDate = moment(); 

        db.query('SELECT email, notification FROM users WHERE id = ?', [task.user_id], (err, users) => {
          if (err || users.length === 0) {
            console.error(`Error fetching user data for user_id ${task.user_id}: `, err);
            return;
          }

          const user = users[0]; 
          const notificationPreference = user.notification || '2 days before';  

          const reminderDate = taskDate.subtract(parseInt(notificationPreference.split(' ')[0]), 'days');

          if (task.alert && reminderDate.isSameOrBefore(currentDate, 'day')) {
            sendEmail(user.email, task.name);  
          }
        });
      });
    })
    .catch(error => {
      console.error('Error reading tasks from server:', error.message);
    });
});
