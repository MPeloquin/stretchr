// This code only runs on the server
// Only publish tasks that are public or belong to the current user
Meteor.publish("tasks", function() {
    return Tasks.find({
        $or: [{
            private: {
                $ne: true
            }
        }, {
            owner: this.userId
        }]
    });
});

Meteor.publish(null, function() {
    if (this.userId != null) {
        return Meteor.users.find({
            _id: this.userId
        }, {
            fields: {
                'createdAt': 1,
                'services': 1,
            }
        });
    } else {
        return this.ready();
    }
});