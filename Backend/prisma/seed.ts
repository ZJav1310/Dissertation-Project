import { Prisma, PrismaClient } from "@prisma/client";
import { AccessEnum } from "../src/utils/access.enum";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

function passwordhash(password: string) {
  return bcrypt.hashSync(password, 8);
}

function daysToMilli(days: number) {
  return 86400000 * days;
}
async function main() {
  const users = async () =>
    await prisma.user.createMany({
      data: [
        {
          user_email: "student1@example.com",
          user_password: passwordhash("password1"),
          user_name: "Mario Liberato",
          user_level: AccessEnum.Student,
        },
        {
          user_email: "lecturer1@example.com",
          user_password: passwordhash("password1"),
          user_name: "Alexandre Lopes",
          user_level: AccessEnum.Lecturer,
        },
        {
          user_email: "student3@example.com",
          user_password: passwordhash("password3"),
          user_name: "Zophia Javari",
          user_level: AccessEnum.Student,
        },
        {
          user_email: "student4@example.com",
          user_password: passwordhash("password4"),
          user_name: "Ryan Boyo",
          user_level: AccessEnum.Student,
        },
        {
          user_email: "admin1@example.com",
          user_password: passwordhash("password1"),
          user_name: "AMO THE VIRUS",
          user_level: AccessEnum.Admin,
        },
        {
          user_email: "lecturer2@example.com",
          user_password: passwordhash("password2"),
          user_name: "Michael Bane",
          user_level: AccessEnum.Lecturer,
        },
      ],
    });
  // users();

  const projects = async () =>
    await prisma.project.createMany({
      // data: [
      //   {
      //     project_title: 'Development of an E-commerce platform',
      //     project_content: 'This project aims to develop a fully functional e-commerce platform for a small business. The platform will have features such as product listings, shopping cart, order management, payment integration, and customer accounts. The project will be developed using the Laravel framework and will follow best practices in software engineering.',
      //     max_capacity: 5,
      //     author_id: 2,
      //   },
      //   {
      //     project_title: 'Study of the Effectiveness of Machine Learning Algorithms for Image Classification',
      //     project_content: 'The purpose of this project is to compare the effectiveness of various machine learning algorithms in classifying images. The project will involve collecting a dataset of images, pre-processing the images, and training different machine learning models on the data. The models will be evaluated based on their accuracy, precision, and recall. The results will be presented in a research paper, along with recommendations for the best machine learning algorithm for image classification tasks.',
      //     max_capacity: 3,
      //     author_id: 6,
      //   },
      //   {
      //     project_title: 'Development of a Mobile App for Campus Navigation',
      //     project_content: 'This project aims to develop a mobile application for campus navigation. The app will allow users to navigate the campus by selecting a building and receiving directions. The app will also provide information about campus events, parking, and dining options. The project will be developed using React Native and will be compatible with both iOS and Android devices.',
      //     max_capacity: 1,
      //     author_id: 6,
      //   },
      //   {
      //     project_title: 'Design and Development of a Web Application for Course Management',
      //     project_content: 'This project aims to develop a web application for course management. The application will allow course instructors to create and manage course content, including lectures, assignments, and exams. Students will be able to access course materials, submit assignments, and receive grades through the application. The project will be developed using the Django framework and will follow best practices in software engineering.',
      //     max_capacity: 1,
      //     author_id: 2,
      //   }
      // ]
      data: [
        {
          project_title: "Development of an E-commerce platform",
          project_content: {
            description:
              "This project aims to develop a fully functional e-commerce platform for a small business. The platform will have features such as product listings, shopping cart, order management, payment integration, and customer accounts. The project will be developed using the Laravel framework and will follow best practices in software engineering.",
            index_terms:
              "E-commerce, Laravel, Software Engineering, Shopping Cart",
            student_requirements:
              "Basic knowledge of web development, familiarity with PHP and JavaScript",
            references:
              "1. E-commerce Best Practices - John Smith, 2. Laravel Web Development - Jane Doe",
            degree_courses: "Computer Science, Software Engineering",
          },
          max_capacity: 5,
          date_created: "2023-07-15T10:00:00Z",
          updated_at: "2023-07-20T15:30:00Z",
          application_deadline: "2023-09-01T23:59:59Z",
          author_id: 2,
          project_optional_details: {
            additional_notes:
              "Previous experience in e-commerce projects will be a plus.",
            project_logo: "https://example.com/project_logo.png",
            related_links: [
              {
                title: "Project Demo",
                url: "https://example.com/project_demo",
              },
              {
                title: "Project Documentation",
                url: "https://example.com/project_documentation",
              },
            ],
          },
        },
        {
          project_title:
            "Study of the Effectiveness of Machine Learning Algorithms for Image Classification",
          project_content: {
            description:
              "The purpose of this project is to compare the effectiveness of various machine learning algorithms in classifying images. The project will involve collecting a dataset of images, pre-processing the images, and training different machine learning models on the data. The models will be evaluated based on their accuracy, precision, and recall. The results will be presented in a research paper, along with recommendations for the best machine learning algorithm for image classification tasks.",
            index_terms: "Machine Learning, Image Classification, Data Science",
            student_requirements:
              "Basic understanding of machine learning concepts, familiarity with Python programming",
            references:
              "1. Machine Learning Foundations - Andrew Ng, 2. Image Processing with Python - Jane Smith",
            degree_courses: "Computer Science, Data Science",
          },
          max_capacity: 3,
          date_created: "2023-07-10T12:00:00Z",
          updated_at: "2023-07-18T09:45:00Z",
          application_deadline: "2023-08-15T23:59:59Z",
          author_id: 6,
          project_optional_details: {
            additional_notes:
              "Experience with deep learning frameworks like TensorFlow or PyTorch is desirable.",
            related_links: [
              {
                title: "Dataset Source",
                url: "https://example.com/dataset_source",
              },
            ],
          },
        },
        {
          project_title: "Development of a Mobile App for Campus Navigation",
          project_content: {
            description:
              "This project aims to develop a mobile application for campus navigation. The app will allow users to navigate the campus by selecting a building and receiving directions. The app will also provide information about campus events, parking, and dining options. The project will be developed using React Native and will be compatible with both iOS and Android devices.",
            index_terms:
              "Mobile App Development, React Native, Campus Navigation",
            student_requirements:
              "Basic knowledge of mobile app development, familiarity with JavaScript and React",
            references:
              "1. Mobile App Design Patterns - John Doe, 2. React Native Cookbook - Jane Johnson",
            degree_courses: "Computer Science, Information Technology",
          },
          max_capacity: 1,
          date_created: "2023-07-20T14:30:00Z",
          updated_at: "2023-07-25T17:15:00Z",
          application_deadline: "2023-09-10T23:59:59Z",
          author_id: 6,
          project_optional_details: {
            additional_notes:
              "Applicants with experience in location-based app development will be given preference.",
            related_links: [
              {
                title: "App Mockup",
                url: "https://example.com/app_mockup",
              },
              {
                title: "Campus Map",
                url: "https://example.com/campus_map",
              },
            ],
          },
        },
        {
          project_title:
            "Design and Development of a Web Application for Course Management",
          project_content: {
            description:
              "This project aims to develop a web application for course management. The application will allow course instructors to create and manage course content, including lectures, assignments, and exams. Students will be able to access course materials, submit assignments, and receive grades through the application. The project will be developed using the Django framework and will follow best practices in software engineering.",
            index_terms: "Web Application, Course Management, Django",
            student_requirements:
              "Basic knowledge of web development, familiarity with Python and HTML/CSS",
            references:
              "1. Django Web Development - Jane Smith, 2. Web Application Security - John Doe",
            degree_courses: "Computer Science, Software Engineering",
          },
          max_capacity: 1,
          date_created: "2023-07-05T09:00:00Z",
          updated_at: "2023-07-15T11:30:00Z",
          application_deadline: "2023-08-20T23:59:59Z",
          author_id: 2,
          project_optional_details: {
            additional_notes:
              "Experience with Django or other web frameworks will be beneficial for applicants.",
            project_logo: "https://example.com/course_management_logo.png",
            related_links: [
              {
                title: "App Demo",
                url: "https://example.com/course_management_demo",
              },
            ],
          },
        },
        {
          project_title: "Market Trends and Sales Data Analysis",
          project_content: {
            description:
              "This project aims to analyze market trends and sales data for a retail company. The analysis will involve data cleaning, visualization, and deriving insights from the data. Python and popular data analysis libraries like Pandas and Matplotlib will be used for the project.",
            index_terms:
              "Data Analysis, Market Trends, Sales Data, Python, Pandas, Matplotlib",
            student_requirements:
              "Proficiency in Python programming and basic understanding of data analysis techniques.",
            references:
              "1. Python for Data Analysis - Wes McKinney, 2. Data Visualization with Matplotlib - Sarah Anderson",
            degree_courses: "Computer Science, Data Science",
          },
          max_capacity: 3,
          date_created: "2023-07-14T13:20:00Z",
          updated_at: "2023-07-27T09:55:00Z",
          application_deadline: "2023-09-08T23:59:59Z",
          author_id: 6,
          project_optional_details: {
            additional_notes:
              "Experience with data wrangling and statistical analysis will be beneficial.",
            project_logo: "https://example.com/data_analysis_logo.png",
            related_links: [
              {
                title: "Sample Data",
                url: "https://example.com/data_analysis_sample_data",
              },
              {
                title: "Data Visualization Examples",
                url: "https://example.com/data_analysis_visualization",
              },
            ],
          },
        },
        {
          project_title: "Development of a 2D Platformer Game",
          project_content: {
            description:
              "This project aims to develop a 2D platformer game with multiple levels, characters, and obstacles. The game will be built using Unity game engine and C# for scripting. The focus will be on creating engaging gameplay and intuitive controls.",
            index_terms: "Game Development, 2D Platformer, Unity, C#",
            student_requirements:
              "Basic knowledge of C# programming and familiarity with game development concepts.",
            references:
              "1. Unity Game Development Essentials - John Williams, 2. C# Game Programming Cookbook - Robert Smith",
            degree_courses: "Computer Science, Game Development",
          },
          max_capacity: 4,
          date_created: "2023-07-12T11:00:00Z",
          updated_at: "2023-07-26T13:10:00Z",
          application_deadline: "2023-09-05T23:59:59Z",
          author_id: 4,
          project_optional_details: {
            additional_notes:
              "Experience with game design and animation will be a plus.",
            project_logo: "https://example.com/platformer_game_logo.png",
            related_links: [
              {
                title: "Game Trailer",
                url: "https://example.com/platformer_game_trailer",
              },
              {
                title: "Game Design Document",
                url: "https://example.com/platformer_game_design",
              },
            ],
          },
        },
        {
          project_title: "Development of a Real-Time Chat Application",
          project_content: {
            description:
              "This project aims to create a real-time chat application that allows users to send instant messages and join chat rooms. The application will be built using Node.js for the backend, Express.js for API development, and React for the frontend. WebSocket technology will be utilized to enable real-time communication.",
            index_terms:
              "Web Development, Real-Time Chat, Node.js, React, WebSocket",
            student_requirements:
              "Proficiency in JavaScript, Node.js, and React. Knowledge of WebSocket technology is helpful but not mandatory.",
            references:
              "1. Mastering Node.js - Eric Greene, 2. React in Action - Mark Thomas",
            degree_courses: "Computer Science, Web Development",
          },
          max_capacity: 6,
          date_created: "2023-07-10T08:45:00Z",
          updated_at: "2023-07-22T17:20:00Z",
          application_deadline: "2023-08-31T23:59:59Z",
          author_id: 1,
          project_optional_details: {
            additional_notes:
              "Familiarity with database systems and RESTful APIs will be advantageous.",
            project_logo: "https://example.com/chat_app_logo.png",
            related_links: [
              {
                title: "Live Demo",
                url: "https://example.com/chat_app_demo",
              },
              {
                title: "API Documentation",
                url: "https://example.com/chat_app_api_docs",
              },
            ],
          },
        },
        {
          project_title: "Development of an Image Recognition System",
          project_content: {
            description:
              "This project aims to build an image recognition system using deep learning techniques. The system will be capable of identifying objects and scenes within images. The project will be implemented using Python and popular machine learning libraries such as TensorFlow and Keras.",
            index_terms:
              "Machine Learning, Image Recognition, Deep Learning, Python",
            student_requirements:
              "Strong programming skills in Python and basic understanding of machine learning concepts.",
            references:
              "1. Deep Learning for Computer Vision - Andrew Ng, 2. Python Machine Learning - Jason Brownlee",
            degree_courses: "Computer Science, Data Science",
          },
          max_capacity: 4,
          date_created: "2023-07-18T14:20:00Z",
          updated_at: "2023-07-24T11:45:00Z",
          application_deadline: "2023-09-10T23:59:59Z",
          author_id: 3,
          project_optional_details: {
            additional_notes:
              "Experience with image processing and neural networks is advantageous.",
            project_logo: "https://example.com/image_recognition_logo.png",
            related_links: [
              {
                title: "Demo Video",
                url: "https://example.com/image_recognition_demo",
              },
              {
                title: "Technical Resources",
                url: "https://example.com/image_recognition_resources",
              },
            ],
          },
        },
        {
          project_title: "Development of a Fitness Tracking Mobile App",
          project_content: {
            description:
              "This project aims to create a fitness tracking mobile app that allows users to log their daily exercises, set fitness goals, and monitor their progress. The app will include features such as workout routines, calorie tracking, and user profile management. It will be developed using Flutter for both Android and iOS platforms.",
            index_terms: "Mobile App, Fitness Tracking, Flutter, Android, iOS",
            student_requirements:
              "Familiarity with Dart programming and mobile app development concepts.",
            references:
              "1. Flutter in Action - Robert Johnson, 2. Mobile App UI Design Principles - Lisa Wilson",
            degree_courses: "Computer Science, Mobile App Development",
          },
          max_capacity: 4,
          date_created: "2023-08-02T09:30:00Z",
          updated_at: "2023-08-10T15:45:00Z",
          application_deadline: "2023-10-01T23:59:59Z",
          author_id: 3,
          project_optional_details: {
            additional_notes:
              "Knowledge of mobile app testing and user experience design is a plus.",
            project_logo: "https://example.com/fitness_app_logo.png",
            related_links: [
              {
                title: "App Mockup",
                url: "https://example.com/fitness_app_mockup",
              },
              {
                title: "App Testing Guide",
                url: "https://example.com/fitness_app_testing",
              },
            ],
          },
        },
        {
          project_title: "Development of a Content Management System (CMS)",
          project_content: {
            description:
              "This project aims to build a robust content management system that allows users to create, edit, and manage digital content. The CMS will support multiple content types, user roles, and permissions. It will be developed using Django framework and Python for backend, along with HTML, CSS, and JavaScript for the frontend.",
            index_terms:
              "Web Development, Content Management System, Django, Python, HTML, CSS, JavaScript",
            student_requirements:
              "Familiarity with Python programming and web development fundamentals.",
            references:
              "1. Django for Beginners - William Vincent, 2. Frontend Web Development - Susan Collins",
            degree_courses: "Computer Science, Web Development",
          },
          max_capacity: 5,
          date_created: "2023-08-08T14:00:00Z",
          updated_at: "2023-08-20T10:20:00Z",
          application_deadline: "2023-10-31T23:59:59Z",
          author_id: 1,
          project_optional_details: {
            additional_notes:
              "Experience with database design and responsive web design will be an advantage.",
            project_logo: "https://example.com/cms_logo.png",
            related_links: [
              {
                title: "Demo Admin Panel",
                url: "https://example.com/cms_demo_admin",
              },
              {
                title: "User Guide",
                url: "https://example.com/cms_user_guide",
              },
            ],
          },
        },
        {
          project_title: "Development of an AI Chatbot",
          project_content: {
            description:
              "This project aims to design and build an AI-powered chatbot that can interact with users, answer questions, and provide assistance on various topics. The chatbot will be trained using natural language processing (NLP) techniques and will be implemented using Python and libraries such as NLTK and TensorFlow.",
            index_terms:
              "Artificial Intelligence, Chatbot, NLP, Python, NLTK, TensorFlow",
            student_requirements:
              "Proficiency in Python programming and basic knowledge of natural language processing.",
            references:
              "1. Natural Language Processing in Action - Lane Smith, 2. Deep Learning with TensorFlow - Jason Collins",
            degree_courses: "Computer Science, Artificial Intelligence",
          },
          max_capacity: 4,
          date_created: "2023-08-11T09:50:00Z",
          updated_at: "2023-08-18T16:00:00Z",
          application_deadline: "2023-11-15T23:59:59Z",
          author_id: 4,
          project_optional_details: {
            additional_notes:
              "Experience with chatbot development and AI model deployment will be beneficial.",
            project_logo: "https://example.com/chatbot_logo.png",
            related_links: [
              {
                title: "Chatbot Demo",
                url: "https://example.com/chatbot_demo",
              },
              {
                title: "NLP Resources",
                url: "https://example.com/chatbot_nlp_resources",
              },
            ],
          },
        },
        {
          project_title: "Predictive Analytics for Sales Forecasting",
          project_content: {
            description:
              "This project aims to apply predictive analytics techniques to sales data for accurate sales forecasting. The project will involve data preprocessing, feature engineering, and building predictive models using machine learning algorithms. Python and data science libraries such as Pandas, NumPy, and Scikit-Learn will be used for implementation.",
            index_terms:
              "Data Science, Predictive Analytics, Sales Forecasting, Python, Pandas, NumPy, Scikit-Learn",
            student_requirements:
              "Strong knowledge of Python programming and understanding of data science concepts.",
            references:
              "1. Hands-On Data Analysis with Python - Mark Johnson, 2. Machine Learning Mastery - Jason Brownlee",
            degree_courses: "Computer Science, Data Science",
          },
          max_capacity: 3,
          date_created: "2023-08-14T12:20:00Z",
          updated_at: "2023-08-22T14:30:00Z",
          application_deadline: "2023-11-30T23:59:59Z",
          author_id: 5,
          project_optional_details: {
            additional_notes:
              "Experience with data visualization and time series analysis will be helpful.",
            project_logo: "https://example.com/sales_forecasting_logo.png",
            related_links: [
              {
                title: "Sample Sales Data",
                url: "https://example.com/sales_forecasting_sample_data",
              },
              {
                title: "Data Visualization Examples",
                url: "https://example.com/sales_forecasting_visualization",
              },
            ],
          },
        },
      ],
    });

  // projects();

  // const applications = async () =>
  //   await prisma.projectApplications.createMany({
  //     data: [
  //       {
  //         user_id: 1,
  //         project_id: 3,
  //         date_applied: new Date(Date.now() - daysToMilli(5)),
  //       },
  //       {
  //         user_id: 3,
  //         project_id: 1,
  //         date_applied: new Date(Date.now() - daysToMilli(1)),
  //       },
  //       {
  //         user_id: 4,
  //         project_id: 1,
  //         date_applied: new Date(Date.now() - daysToMilli(10)),
  //       },
  //       {
  //         user_id: 1,
  //         project_id: 1,
  //         date_applied: new Date(Date.now() - daysToMilli(1)),
  //       },
  //       {
  //         user_id: 3,
  //         project_id: 4,
  //         date_applied: new Date(Date.now() - daysToMilli(4)),
  //       },
  //       {
  //         user_id: 3,
  //         project_id: 2,
  //         date_applied: new Date(Date.now() - daysToMilli(2)),
  //       },
  //     ],
  //   });
  // applications();

  const files = async () =>
    await prisma.projectFile.createMany({
      data: [
        {
          project_id: 1,
          file_id: 101,
          file_name: "study_report.pdf",
          file_format: "PDF",
          file_location: "https://example.com/files/project1/study_report.pdf",
          file_date_upload: "2023-07-31T09:00:00Z",
        },
        {
          project_id: 2,
          file_id: 102,
          file_name: "campus_app_prototype.png",
          file_format: "PNG",
          file_location:
            "https://example.com/files/project2/campus_app_prototype.png",
          file_date_upload: "2023-07-31T10:30:00Z",
        },
        {
          project_id: 3,
          file_id: 103,
          file_name: "course_management_app_design.pdf",
          file_format: "PDF",
          file_location:
            "https://example.com/files/project3/course_management_app_design.pdf",
          file_date_upload: "2023-07-31T12:15:00Z",
        },
        {
          project_id: 4,
          file_id: 104,
          file_name: "e-commerce_platform_demo.mp4",
          file_format: "MP4",
          file_location:
            "https://example.com/files/project4/e-commerce_platform_demo.mp4",
          file_date_upload: "2023-07-31T14:45:00Z",
        },
        {
          project_id: 5,
          file_id: 105,
          file_name: "new_study_report.pdf",
          file_format: "PDF",
          file_location:
            "https://example.com/files/project5/new_study_report.pdf",
          file_date_upload: "2023-07-31T16:30:00Z",
        },
        {
          project_id: 6,
          file_id: 106,
          file_name: "market_trends_analysis.xlsx",
          file_format: "XLSX",
          file_location:
            "https://example.com/files/project6/market_trends_analysis.xlsx",
          file_date_upload: "2023-07-31T18:00:00Z",
        },
        {
          project_id: 7,
          file_id: 107,
          file_name: "platformer_game_design.pdf",
          file_format: "PDF",
          file_location:
            "https://example.com/files/project7/platformer_game_design.pdf",
          file_date_upload: "2023-07-31T20:20:00Z",
        },
        {
          project_id: 8,
          file_id: 108,
          file_name: "real-time_chat_app_demo.mp4",
          file_format: "MP4",
          file_location:
            "https://example.com/files/project8/real-time_chat_app_demo.mp4",
          file_date_upload: "2023-07-31T22:10:00Z",
        },
        {
          project_id: 9,
          file_id: 109,
          file_name: "image_recognition_system_demo.png",
          file_format: "PNG",
          file_location:
            "https://example.com/files/project9/image_recognition_system_demo.png",
          file_date_upload: "2023-08-01T09:40:00Z",
        },
        {
          project_id: 10,
          file_id: 110,
          file_name: "fitness_app_prototype.png",
          file_format: "PNG",
          file_location:
            "https://example.com/files/project10/fitness_app_prototype.png",
          file_date_upload: "2023-08-01T11:20:00Z",
        },
        {
          project_id: 11,
          file_id: 111,
          file_name: "cms_app_design.pdf",
          file_format: "PDF",
          file_location:
            "https://example.com/files/project11/cms_app_design.pdf",
          file_date_upload: "2023-08-01T13:15:00Z",
        },
        {
          project_id: 12,
          file_id: 112,
          file_name: "chatbot_system_demo.mp4",
          file_format: "MP4",
          file_location:
            "https://example.com/files/project12/chatbot_system_demo.mp4",
          file_date_upload: "2023-08-01T15:30:00Z",
        },
        {
          project_id: 13,
          file_id: 113,
          file_name: "sales_forecasting_analysis.xlsx",
          file_format: "XLSX",
          file_location:
            "https://example.com/files/project13/sales_forecasting_analysis.xlsx",
          file_date_upload: "2023-08-01T17:45:00Z",
        },
      ],
    });

  const applications = async () =>
    await prisma.projectApplications.createMany({
      data: [
        {
          user_id: 7,
          project_id: 1,
          date_applied: "2023-08-02T09:30:00Z",
          choice: 1
        },
        {
          user_id: 7,
          project_id: 5,
          date_applied: "2023-08-02T10:45:00Z",
          choice: 2
        },
        {
          user_id: 7,
          project_id: 9,
          date_applied: "2023-08-02T12:15:00Z",
          choice: 3
        },
        {
          user_id: 1,
          project_id: 1,
          date_applied: "2023-08-02T08:00:00Z",
          choice: 1
        },
        {
          user_id: 1,
          project_id: 3,
          date_applied: "2023-08-02T09:50:00Z",
          choice: 2
        },
        {
          user_id: 1,
          project_id: 4,
          date_applied: "2023-08-02T11:30:00Z",
          choice: 3
        },
        {
          user_id: 3,
          project_id: 2,
          date_applied: "2023-08-02T10:00:00Z",
          choice: 1
        },
        {
          user_id: 3,
          project_id: 3,
          date_applied: "2023-08-02T11:20:00Z",
          choice: 2
        },
        {
          user_id: 3,
          project_id: 8,
          date_applied: "2023-08-02T14:00:00Z",
          choice: 3
        },
        {
          user_id: 4,
          project_id: 2,
          date_applied: "2023-08-02T12:30:00Z",
          choice: 1
        },
        {
          user_id: 4,
          project_id: 5,
          date_applied: "2023-08-02T13:45:00Z",
          choice: 2
        },
        {
          user_id: 4,
          project_id: 11,
          date_applied: "2023-08-02T15:20:00Z",
          choice: 3
        },
      ],
    });

  files();
  applications();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
