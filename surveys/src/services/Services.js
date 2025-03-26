import { interpretations } from "../data/Questions";
export const interpretScore = (section, score) => {
  if (section === "A" && score <= 17) return interpretations.A[0];
  if (section === "A" && score <= 29) return interpretations.A[1];
  if (section === "A") return interpretations.A[2];
  if (section === "B" && score <= 5) return interpretations.B[0];
  if (section === "B" && score <= 11) return interpretations.B[1];
  if (section === "B") return interpretations.B[2];
  if (section === "C" && score >= 40) return interpretations.C[2];
  if (section === "C" && score >= 34) return interpretations.C[1];
  return interpretations.C[2];
};

// Function to calculate Big Five scores
export const calculateBigFiveScores = (answers) => {
  let flip = (score) => 6 - score;

  return {
    E:
      20 +
      answers[1] -
      flip(answers[6]) +
      answers[11] -
      flip(answers[16]) +
      answers[21] -
      flip(answers[26]) +
      answers[31] -
      flip(answers[36]) +
      answers[41] -
      flip(answers[46]),
    A:
      14 -
      flip(answers[2]) +
      answers[7] -
      flip(answers[12]) +
      answers[17] -
      flip(answers[22]) +
      answers[27] -
      flip(answers[32]) +
      answers[37] +
      answers[42] +
      answers[47],
    C:
      14 +
      answers[3] -
      flip(answers[8]) +
      answers[13] -
      flip(answers[18]) +
      answers[23] -
      flip(answers[28]) +
      answers[33] -
      flip(answers[38]) +
      answers[43] +
      answers[48],
    N:
      38 -
      flip(answers[4]) +
      answers[9] -
      flip(answers[14]) +
      answers[19] -
      flip(answers[24]) -
      flip(answers[29]) -
      flip(answers[34]) -
      flip(answers[39]) -
      flip(answers[44]) -
      flip(answers[49]),
    O:
      8 +
      answers[5] -
      flip(answers[10]) +
      answers[15] -
      flip(answers[20]) +
      answers[25] -
      flip(answers[30]) +
      answers[35] +
      answers[40] +
      answers[45] +
      answers[50],
  };
};
