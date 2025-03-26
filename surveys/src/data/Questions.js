export const questions = {
  A: [
    "I feel emotionally drained by my work.",
    "Working with people all day long requires a great deal of effort.",
    "I feel like my work is breaking me down.",
    "I feel frustrated by my work.",
    "I feel I work too hard at my job.",
    "It stresses me too much to work in direct contact with people.",
    "I feel like I’m at the end of my rope.",
  ],
  B: [
    "I feel I look after certain patients/clients impersonally, as if they are objects.",
    "I feel tired when I get up in the morning and have to face another day at work.",
    "I have the impression that my patients/clients make me responsible for some of their problems.",
    "I am at the end of my patience at the end of my work day.",
    "I really don’t care about what happens to some of my patients/clients.",
    "I have become more insensitive to people since I’ve been working.",
    "I’m afraid that this job is making me uncaring.",
  ],
  C: [
    "I accomplish many worthwhile things in this job.",
    "I feel full of energy.",
    "I am easily able to understand what my patients/clients feel.",
    "I look after my patients’/clients’ problems very effectively.",
    "In my work, I handle emotional problems very calmly.",
    "Through my work, I feel that I have a positive influence on people.",
    "I am easily able to create a relaxed atmosphere with my patients/clients.",
    "I feel refreshed when I have been close to my patients/clients at work.",
  ],
};

export const options = [
  { value: 0, label: "Never" },
  { value: 1, label: "A Few Times per Year" },
  { value: 2, label: "Once a Month" },
  { value: 3, label: "A Few Times per Month" },
  { value: 4, label: "Once a Week" },
  { value: 5, label: "A Few Times per Week" },
  { value: 6, label: "Every Day" },
];

export const interpretations = {
  A: [
    "Low-level burnout",
    "Moderate burnout",
    "High-level burnout: Testifies to fatigue at the very idea of work, chronic fatigue, trouble sleeping, physical problems. For the MBI, as well as for most authors, “exhaustion would be the key component of the syndrome.” Unlike depression, the problems disappear outside work.",
  ],
  B: [
    "Low-level burnout",
    "Moderate burnout",
    "High-level burnout: Rather a “dehumanization” in interpersonal relations. The notion of detachment is excessive, leading to cynicism with negative attitudes with regard to patients or colleagues, feeling of guilt, avoidance of social contacts and withdrawing into oneself. The professional blocks the empathy he can show to his patients and/or colleagues.",
  ],
  C: [
    "High-level burnout",
    "Moderate burnout",
    "Low-level burnout: The individual assesses himself negatively, feels he is unable to move the situation forward. This component represents the demotivating effects of a difficult, repetitive situation leading to failure despite efforts. The person begins to doubt his genuine abilities to accomplish things. This aspect is a consequence of the first two.",
  ],
};

//================================== dr. mohamed data =============================================
export const personalityQuestions = {
  questions: [
    "Am the life of the party.",
    "Feel little concern for others.",
    "Am always prepared.",
    "Get stressed out easily.",
    "Have a rich vocabulary.",
    "Don't talk a lot.",
    "Am interested in people.",
    "Leave my belongings around.",
    "Am relaxed most of the time.",
    "Have difficulty understanding abstract ideas.",
    "Feel comfortable around people.",
    "Insult people.",
    "Pay attention to details.",
    "Worry about things.",
    "Have a vivid imagination.",
    "Keep in the background.",
    "Sympathize with others' feelings.",
    "Make a mess of things.",
    "Seldom feel blue.",
    "Am not interested in abstract ideas.",
    "Start conversations.",
    "Am not interested in other people's problems.",
    "Get chores done right away.",
    "Am easily disturbed.",
    "Have excellent ideas.",
    "Have little to say.",
    "Have a soft heart.",
    "Often forget to put things back in their proper place.",
    "Get upset easily.",
    "Do not have a good imagination.",
    "Talk to a lot of different people at parties.",
    "Am not really interested in others.",
    "Like order.",
    "Change my mood a lot.",
    "Am quick to understand things.",
    "Don't like to draw attention to myself.",
    "Take time out for others.",
    "Shirk my duties.",
    "Have frequent mood swings.",
    "Use difficult words.",
    "Don't mind being the center of attention.",
    "Feel others' emotions.",
    "Follow a schedule.",
    "Get irritated easily.",
    "Spend time reflecting on things.",
    "Am quiet around strangers.",
    "Make people feel at ease.",
    "Am exacting in my work.",
    "Often feel blue.",
    "Am full of ideas.",
  ],
};

export const PersonalityOptions = [
  { value: 1, label: "Strongly Disagree" },
  { value: 2, label: "Disagree" },
  { value: 3, label: "Neutral" },
  { value: 4, label: "Agree" },
  { value: 5, label: "Strongly Agree" },
];

console.log(personalityQuestions);
