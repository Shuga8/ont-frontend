const List = [
  {
    title: "Introduction to survey and consent",
    questions: {
      english: [
        {
          question:
            "May I ask you a few short questions? The survey will take about 15 minutes and you may stop at any time.",
          type: "single_choice",
          options: ["yes", "no"],
          answers: ["yes"],
        },
      ],
      pidgin: [
        {
          question:
            "I fit ask you some questions?, i no go take pass 15 minutes of your time",
          type: "single_choice",
          options: ["yes", "no"],
          answers: ["yes"],
        },
      ],
    },
    isCompleted: false,
  },
  {
    title: "Descriptive, demographic information of respondent",
    questions: {
      english: [
        {
          question:
            "Are you the parent or caregiver of any children who are younger than 2 years old?",
          type: "single_choice",
          options: ["yes", "no"],
          answers: [],
        },
        {
          question: "Are you residing in [name LGA from listing] ? ",
          type: "single_choice",
          options: ["yes", "no"],
          answers: ["yes"],
        },
        {
          question: "Number of total household members",
          type: "single_choice",
          options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
          answers: [],
        },
        {
          question: "What is your relationship with the child?",
          type: "single_choice",
          options: [
            "Mother",
            "Father",
            "Grand Parents",
            "Guardian",
            "Sibling",
            "Others...please specify",
          ],
          limit: 50,
          answers: [],
        },
        {
          question: "You are a caregiver to how many children under -2?",
          type: "single_choice",
          options: ["1", "2", "3", "4", "5"],
          answers: ["4"],
        },
        {
          question: "What is your age?",
          type: "open",
          field: "number",
          answers: ["40"],
        },
        {
          question: "What is your gender?",
          type: "single_choice",
          options: ["male", "female"],
          answers: [],
        },
        {
          question: "What is  your education level?",
          type: "single_choice",
          options: [
            "primary school certificate",
            "secondary school certificate",
            "undergraduate",
            "graduate",
            "postgraduate",
            "did not attend school",
          ],
          answers: ["undergraduate"],
        },
        {
          question: "What is your employment status",
          type: "single_choice",
          options: ["employed", "self-employed", "not employed"],
          answers: [],
        },
      ],
      pidgin: [
        {
          question:
            "Na you be the parent of any pikin wey no reach the age of 2?",
          type: "single_choice",
          options: ["yes", "no"],
          answers: [],
        },
      ],
    },
    isCompleted: false,
  },
];
export default List;
