// 管理所有的user

const users = [];
module.exports = {
  addUser(id, userInfo) {
    users.push({
      id,
      ...userInfo,
    });
  },

  findUser(id) {
    return users.find((userInfo) => userInfo.id == id);
  },
};
