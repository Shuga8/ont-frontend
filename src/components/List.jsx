const List = [
  {
    title: "Introduction to survey and consent",
    questions: [
      {
        question:
          "May I ask you a few short questions? The survey will take about 15 minutes and you may stop at any time.",
        type: "single_choice",
        options: ["yes", "no"],
        answers: [],
      },
    ],
    isCompleted: false,
  },
  {
    title: "Descriptive, demographic information of respondent",
    questions: [
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
        answers: [],
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
        answers: [],
      },

      {
        question: "You are a caregiver to how many children under -2?",
        type: "single_choice",
        options: ["1", "2", "3", "4", "5"],
        answers: [],
      },

      {
        question: "What is your age?",
        type: "open",
        field: "number",
        answers: [],
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
        answers: [],
      },

      {
        question: "What is your employment status",
        type: "single_choice",
        options: ["employed", "self-employed", "not employed"],
        answers: [],
      },
    ],
    isCompleted: false,
  },
  {
    title: "Access to healthcare and recent mobility",
    questions: [
      {
        question:
          "What is the name of the preferred location to seek care in an emergency?",
        type: "open",
        answers: [],
      },
      {
        question: "If female, where did you give birth to your youngest child?",
        type: "single_choice",
        options: [
          "Primary Healthcare centre",
          "General Hospital/Tertiary health facility/Private Health facility",
          "Traditional Birth Attendant/Mission homes",
          "Others...please specify",
        ],
        answers: [],
      },
      {
        question:
          "If you want to seek health care but cannot, what is the reason? More than one reason can be selected?",
        type: "multiple_choice",
        options: [
          "Hospital fees/expenses",
          "Security challenges",
          "Cost to travel",
          "Time to travel",
          "Clinic opening hours",
          "Clinic too crowded",
          "Clinic not functioning",
          "Healthworker attitude",
          "No supplies",
          "other",
        ],
        answers: [],
      },
    ],
    isCompleted: false,
  },
  {
    title: "Nutritional status of child and breastfeeding knowledge ",
    questions: [
      {
        question:
          "Has the child been screened for their nutrition status? For example, have they been weighed and measured at a health facility or by a community health worker.",
        type: "single_choice",
        options: ["yes", "no"],
        answers: [],
      },
      {
        question: "If female, where did you give birth to your youngest child?",
        type: "single_choice",
        options: [
          "Primary Healthcare centre",
          "General Hospital/Tertiary health facility/Private Health facility",
          "Traditional Birth Attendant/Mission homes",
          "Others...please specify",
        ],
        answers: [],
      },
      {
        question:
          "If you want to seek health care but cannot, what is the reason? More than one reason can be selected?",
        type: "multiple_choice",
        options: [
          "Hospital fees/expenses",
          "Security challenges",
          "Cost to travel",
          "Time to travel",
          "Clinic opening hours",
          "Clinic too crowded",
          "Clinic not functioning",
          "Healthworker attitude",
          "No supplies",
          "other",
        ],
        answers: [],
      },
    ],
    isCompleted: false,
  },
  {
    title: "Access to healthcare and recent mobility",
    questions: [
      {
        question:
          "What is the name of the preferred location to seek care in an emergency?",
        type: "open",
        answers: [],
      },
      {
        question: "If female, where did you give birth to your youngest child?",
        type: "single_choice",
        options: [
          "Primary Healthcare centre",
          "General Hospital/Tertiary health facility/Private Health facility",
          "Traditional Birth Attendant/Mission homes",
          "Others...please specify",
        ],
        answers: [],
      },
      {
        question:
          "If you want to seek health care but cannot, what is the reason? More than one reason can be selected?",
        type: "multiple_choice",
        options: [
          "Hospital fees/expenses",
          "Security challenges",
          "Cost to travel",
          "Time to travel",
          "Clinic opening hours",
          "Clinic too crowded",
          "Clinic not functioning",
          "Healthworker attitude",
          "No supplies",
          "other",
        ],
        answers: [],
      },
    ],
    isCompleted: false,
  },
];

export default List;
