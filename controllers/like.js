
const Sauce = require('../models/Sauce');


exports.likeStatus = (req, res, next) => {
    const like = req.body.like;
    const userId = req.body.userId;

  
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            let userLike = sauce.usersLiked.find(id => id === userId);
            let userDislike = sauce.usersDisliked.find(id => id === userId);

            switch (like) {
               case 1 :
                   if (!userLike) {
                        sauce.likes += 1;
                        sauce.usersLiked.push(userId);
                    } else {
                        throw new Error('un seul like possible!');
                    } 
                                  if (userDislike) {
                        throw new Error('annuler votre dislike avant de liker!');
                    }
                break;

                           case 0 :
                             if (userLike) {
                        sauce.likes -= 1;
                        sauce.usersLiked = sauce.usersLiked.filter(id => id !== userId);
                    }
                              else {
              
                        if (userDislike) {
                        sauce.dislikes -= 1;
                        sauce.usersDisliked = sauce.usersDisliked.filter(id => id !== userId);
                        }   
                    }
                break;

             
                case -1 :
                                   if (!userDislike) {
                        sauce.dislikes += 1;
                        sauce.usersDisliked.push(userId);
                    } else {
                                        throw new Error('un seul dislike possible!');
                    } 
                             if (userLike) {
                        throw new Error('annuler votre like avant de disliker!');
                    }
            }
               sauce.save()
                .then(() => res.status(201).json({ message: 'préférence enregistrée !' }))
                .catch(error => res.status(400).json({ error }));

            })
        .catch(error => res.status(500).json({ error : error.message }));
};