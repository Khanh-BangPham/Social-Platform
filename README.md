# Simple-Social-Platform
## Introduction
This is a project I carried out to upgrade my coding skills using two frameworks: ReactJS and NodeJS. I focused more on NodeJS and database optimization.

Database allow to add users, connections between them, as well as companies. Companies have managers (users) who are responsible for managing the page. Both users and companies can add posts, but only users can comment or like them (and like comments also). Post can be assigned to multiple tags, and every user can follow any number of tags. The user's profile can be viewed by another user, which is stored in database.

The user's profile contains also his personal work experience, where is stored his proffesional history (where he/she worked, when, on which position), e-mail address and website.

The company's profile contains information about it's management, city of residence and industry.

I focused on basic funtionality like:
- Register/ Login
- Chat real-time
- User connections
- Post/comment/react
  
Innovative functions are expected to be added:
- Automated online interview:
  The function helps companies create their own interviews without spending a lot of time asking the same questions to different candidates. Instead, companies only need to prepare questions for each topic:   
    introductory questions, technical questions, soft skills questions, and keywords needed in the candidates' answers. The application will record the interview and evaluate answers by analyzing voice and       
    attitude to determine the level of compatibility between the candidate and the company's application goals.
- Smart suggestions between company and candidate:
  The function helps companies and candidates find each other more easily by simultaneously analyzing the information of candidates and employers.

## Database
### Relational Diagram
![image](https://github.com/Khanh-BangPham/Social-Platform/assets/77458357/7db0f4fa-e117-43c7-af67-0a37e5d0c635)
### Triggers
There are 3 triggers:

- Correcting data after deleting user - changing authorship of posts and comments to specially created ghost user (I don't know if LinkedIn uses this mechanisms, but I copied that from Facebook) or deleting some data that don't make sense without user.
- The other 2 triggers delete the likes of post on comments after making changes to it's text (also here I don't know if it's the case in LinkedIn, but I personaly feel it makes sense - users don't know if they still agree with changed content of comment or post)
