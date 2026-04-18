export interface SubjectMark {
  subject: string;
  theory: number;
  practical: number;
  total: number;
  grade: string;
  gradePoint: number;
}

export interface StudentResult {
  symbolNumber: string;
  name: string;
  schoolName: string;
  gpa: number | string;
  overallGrade: string;
  status: 'Pass' | 'Fail';
  marks: SubjectMark[];
}

export interface Topper {
  name: string;
  school: string;
  gpa: number;
  symbolNumber: string;
}

export const headers = ['Subject', 'Theory', 'Practical', 'Total', 'Grade', 'GP'];

const calculateGradeAndGP = (totalMarks: number): { grade: string; gp: number } => {
  if (totalMarks >= 90) return { grade: 'A+', gp: 4.0 };
  if (totalMarks >= 80) return { grade: 'A', gp: 3.6 };
  if (totalMarks >= 70) return { grade: 'B+', gp: 3.2 };
  if (totalMarks >= 60) return { grade: 'B', gp: 2.8 };
  if (totalMarks >= 50) return { grade: 'C+', gp: 2.4 };
  if (totalMarks >= 40) return { grade: 'C', gp: 2.0 };
  if (totalMarks >= 35) return { grade: 'D', gp: 1.6 };
  return { grade: 'NG', gp: 0.0 };
};

const generateSubjectMark = (subject: string, theoryScore: number, practicalScore: number = 25): SubjectMark => {
  const total = theoryScore + practicalScore;
  const { grade, gp } = calculateGradeAndGP(total);
  return { subject, theory: theoryScore, practical: practicalScore, total, grade, gradePoint: gp };
};

export const MOCK_RESULTS: Record<string, StudentResult> = {
  '00916301I': {
    symbolNumber: '00916301I',
    name: 'Candidate 00916301I',
    schoolName: 'Laxmi Secondary School',
    gpa: 3.09,
    overallGrade: 'B+',
    status: 'Pass',
    marks: [
      generateSubjectMark('Compulsory English', 62, 24),
      generateSubjectMark('Compulsory Nepali', 48, 23),
      generateSubjectMark('Compulsory Math', 50, 24),
      generateSubjectMark('Compulsory Science', 42, 22),
      generateSubjectMark('Compulsory Social Studies', 45, 23),
      generateSubjectMark('Optional I (Computer)', 48, 24),
    ],
  },
  '00916309Q': {
    symbolNumber: '00916309Q',
    name: 'Candidate 00916309Q',
    schoolName: 'Laxmi Secondary School',
    gpa: 3.00,
    overallGrade: 'B+',
    status: 'Pass',
    marks: [
      generateSubjectMark('Compulsory English', 60, 24),
      generateSubjectMark('Compulsory Nepali', 45, 23),
      generateSubjectMark('Compulsory Math', 50, 24),
      generateSubjectMark('Compulsory Science', 40, 22),
      generateSubjectMark('Compulsory Social Studies', 42, 23),
      generateSubjectMark('Optional I (Computer)', 45, 24),
    ],
  },
  '00916304I': {
    symbolNumber: '00916304I',
    name: 'Candidate 00916304I',
    schoolName: 'Laxmi Secondary School',
    gpa: 3.09,
    overallGrade: 'B+',
    status: 'Pass',
    marks: [
      generateSubjectMark('Compulsory English', 62, 24),    // Total 86 -> A  (3.6)
      generateSubjectMark('Compulsory Nepali', 48, 23),     // Total 71 -> B+ (3.2)
      generateSubjectMark('Compulsory Math', 50, 24),       // Total 74 -> B+ (3.2)
      generateSubjectMark('Compulsory Science', 42, 22),    // Total 64 -> B  (2.8)
      generateSubjectMark('Compulsory Social Studies', 45, 23), // Total 68 -> B (2.8)
      generateSubjectMark('Optional I (Computer)', 48, 24), // Total 72 -> B+ (3.2)
    ],
  },
  '00916304L': {
    symbolNumber: '00916304L',
    name: 'Candidate 00916304L',
    schoolName: 'Laxmi Secondary School',
    gpa: 'NG',
    overallGrade: 'NG',
    status: 'Fail',
    marks: [
      generateSubjectMark('Compulsory English', 20, 15),
      generateSubjectMark('Compulsory Nepali', 25, 20),
      generateSubjectMark('Compulsory Math', 15, 20),
      generateSubjectMark('Compulsory Science', 18, 18),
      generateSubjectMark('Compulsory Social Studies', 22, 20),
      generateSubjectMark('Optional I (Computer)', 20, 24),
    ],
  },
  '0010001A': {
    symbolNumber: '0010001A',
    name: 'Aarav Sharma',
    schoolName: 'Everest Secondary Boarding School, Kathmandu',
    gpa: 3.9,
    overallGrade: 'A+',
    status: 'Pass',
    marks: [
      generateSubjectMark('Compulsory English', 70, 24),
      generateSubjectMark('Compulsory Nepali', 65, 23),
      generateSubjectMark('Compulsory Math', 75, 25),
      generateSubjectMark('Compulsory Science', 72, 24),
      generateSubjectMark('Compulsory Social Studies', 68, 22),
      generateSubjectMark('Optional I (EPHA)', 73, 24),
    ],
  },
  '0010002B': {
    symbolNumber: '0010002B',
    name: 'Bishal Thapa',
    schoolName: 'Janakalyan Madhyamik Vidyalaya, Pokhara',
    gpa: 2.8,
    overallGrade: 'B',
    status: 'Pass',
    marks: [
      generateSubjectMark('Compulsory English', 45, 20),
      generateSubjectMark('Compulsory Nepali', 55, 21),
      generateSubjectMark('Compulsory Math', 40, 22),
      generateSubjectMark('Compulsory Science', 50, 23),
      generateSubjectMark('Compulsory Social Studies', 60, 20),
      generateSubjectMark('Optional I (Computer)', 35, 24),
    ],
  },
  '0010003C': {
    symbolNumber: '0010003C',
    name: 'Critika Shrestha',
    schoolName: 'Siddhartha Shiksha Sadan, Lalitpur',
    gpa: 1.6,
    overallGrade: 'D',
    status: 'Fail',
    marks: [
      generateSubjectMark('Compulsory English', 20, 15),
      generateSubjectMark('Compulsory Nepali', 35, 20),
      generateSubjectMark('Compulsory Math', 15, 20),
      generateSubjectMark('Compulsory Science', 25, 18),
      generateSubjectMark('Compulsory Social Studies', 30, 20),
      generateSubjectMark('Optional I (Accountancy)', 20, 15),
    ],
  },
};

export const TOPPERS: Topper[] = [
  { name: 'Aarav Sharma', school: 'Everest Secondary Boarding School', gpa: 3.9, symbolNumber: '0010001A' },
  { name: 'Sujata Karki', school: 'Little Angels School', gpa: 3.86, symbolNumber: '0010004D' },
  { name: 'Nabin Poudel', school: 'Sainik Awasiya Mahavidyalaya', gpa: 3.82, symbolNumber: '0010005E' },
];

export const fetchResult = async (symbolNum: string): Promise<StudentResult> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const formattedSymbol = symbolNum.trim().toUpperCase();
      const existingResult = MOCK_RESULTS[formattedSymbol];
      
      if (existingResult) {
        resolve(existingResult);
        return;
      }

      // Generate a dynamic "Pass" result with a random GPA between 2.0 and 4.0
      // "Random number come should appear in the middle of 2 or 4"
      const generatedMarks: SubjectMark[] = [];
      const subjects = [
        'Compulsory English',
        'Compulsory Nepali',
        'Compulsory Math',
        'Compulsory Science',
        'Compulsory Social Studies',
        'Optional I (Computer)'
      ];

      let totalGpSum = 0;
      
      subjects.forEach(subject => {
        // Generate total marks between 45 and 98 to ensure passing grades (C to A+)
        // which gives GP between 2.0 and 4.0
        const minMarks = 45;
        const maxMarks = 98;
        const totalMarks = Math.floor(Math.random() * (maxMarks - minMarks + 1)) + minMarks;
        
        const practicalScore = Math.floor(Math.random() * 5) + 21; // 21 to 25
        let theoryScore = totalMarks - practicalScore;
        if (theoryScore > 75) theoryScore = 75;

        const subjectMark = generateSubjectMark(subject, theoryScore, practicalScore);
        generatedMarks.push(subjectMark);
      });

      // Make all random unlisted symbol numbers FAIL by default
      const averageGpa = 'NG';
      const overallGrade = 'NG';

      const newResult: StudentResult = {
        symbolNumber: formattedSymbol,
        name: `Candidate ${formattedSymbol}`,
        schoolName: 'Laxmi Secondary School',
        gpa: averageGpa,
        overallGrade: overallGrade,
        status: 'Fail', // Default all unknown to Fail
        marks: generatedMarks,
      };

      // Save to mock database so it remains exactly the same for repeated searches
      MOCK_RESULTS[formattedSymbol] = newResult;

      resolve(newResult);

    }, 1000); // simulate network delay
  });
};
