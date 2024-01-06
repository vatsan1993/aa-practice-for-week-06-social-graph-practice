// Implement the SocialNetwork class here
class SocialNetwork {
  constructor() {
    this.users = {};
    this.follows = {};
    this.currentID = 0;
  }

  addUser(name) {
    // Your code here
    this.currentID++;
    let newUser = {
      id: this.currentID,
      name: name,
    };
    this.users[this.currentID] = newUser;
    this.follows[this.currentID] = new Set();
    return newUser.id;
  }

  getUser(userID) {
    // Your code here

    if (userID in this.users) {
      let user = this.users[userID];
      return user;
    }
    return null;
  }

  follow(userID1, userID2) {
    // Your code here
    let user1 = this.getUser(userID1);
    let user2 = this.getUser(userID2);
    if (user1 !== null && user2 != null) {
      let data = this.follows[userID1];
      data.add(userID2);
      return true;
    } else {
      return false;
    }
  }

  getFollows(userID) {
    // Your code here
    if (this.getUser(userID)) {
      return this.follows[userID];
    }
    return false;
  }

  getFollowers(userID) {
    // Your code here
    let followers = new Set();
    for (let userID1 in this.users) {
      let follows = this.getFollows(userID1);
      if (follows.has(userID)) {
        followers.add(parseInt(userID1));
      }
    }
    return followers;
  }

  getRecommendedFollows(userID, degrees) {
    // Your code here
    let queue = [userID, ...this.follows[userID]];
    let visited = new Set(queue);
    let nodes = [];
    let degree = 0;
    while (degree < degrees) {
      let values = [...queue];
      queue = [];
      for (let val of values) {
        let follows = this.follows[val];
        for (let follow of follows) {
          if (!visited.has(follow)) {
            visited.add(follow);
            queue.push(follow);
            nodes.push(follow);
          }
        }
      }
      degree++;
    }
    return nodes;
  }
}

module.exports = SocialNetwork;
