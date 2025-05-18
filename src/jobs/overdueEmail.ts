import cron from 'node-cron';
import { Task } from '../models/task';
import { User } from '../models/user';
import { Op } from 'sequelize';

// every day at 5am:
cron.schedule('0 5 * * *', async () => {
  const overdue = await Task.findAll({
    where: { completed: false, due_date: { [Op.lt]: new Date() } },
    include: [User]
  });

  const grouped = overdue.reduce<Record<string, Task[]>>((acc, t) => {
    const uid = t.user_id;
    acc[uid] = acc[uid] || [];
    acc[uid].push(t);
    return acc;
  }, {});

  for (const [uid, tasks] of Object.entries(grouped)) {
    const user = await User.findByPk(uid);
    if (!user) continue;

    // -- here we can integrate real email service --
    console.log(`Email to ${user.email}: you have ${tasks.length} overdue tasks.`);
  }
});
