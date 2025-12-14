import { Module } from './types';

// Parsing a subset of the provided questions for demonstration. 
// In a real production app, this would be a complete database or JSON file.

export const BIO_MODULES: Module[] = [
  {
    id: "mod1",
    title: "Module 1: Foundations of Biology",
    description: "Biological Terminology, Introduction to Biology, and General Knowledge.",
    questions: [
      { id: 1, question: "The term biology means:", options: ["Study of earth", "Study of plants", "Study of life", "Study of matter"], correctAnswer: "Study of life" },
      { id: 2, question: "The branch of biology that deals with the study of animals is called:", options: ["Botany", "Zoology", "Anatomy", "Microbiology"], correctAnswer: "Zoology" },
      { id: 3, question: "Who is known as the “Father of Biology”?", options: ["Darwin", "Mendel", "Aristotle", "Hooke"], correctAnswer: "Aristotle" },
      { id: 4, question: "The scientist who discovered the cell in 1665 was:", options: ["Robert Hooke", "Anton van Leeuwenhoek", "Louis Pasteur", "Charles Darwin"], correctAnswer: "Robert Hooke" },
      { id: 5, question: "The basic unit of life is:", options: ["Organ", "Cell", "Atom", "Tissue"], correctAnswer: "Cell" },
      { id: 6, question: "The scientific name of humans is:", options: ["Homo erectus", "Homo habilis", "Homo sapiens", "Homo neanderthalensis"], correctAnswer: "Homo sapiens" },
      { id: 7, question: "Who coined the term “cell”?", options: ["Mendel", "Hooke", "Pasteur", "Darwin"], correctAnswer: "Hooke" },
      { id: 8, question: "Who is known as the “Father of Medicine”?", options: ["Hippocrates", "Aristotle", "Koch", "Linnaeus"], correctAnswer: "Hippocrates" },
      { id: 9, question: "Who discovered penicillin in 1928?", options: ["Pasteur", "Fleming", "Koch", "Jenner"], correctAnswer: "Fleming" },
      { id: 10, question: "The smallest independently functioning unit of life is:", options: ["Organ", "Cell", "Tissue", "System"], correctAnswer: "Cell" },
    ]
  },
  {
    id: "mod2",
    title: "Module 2: Tools and Characteristics of Life",
    description: "Microscope usage, Characteristics of Life, Competition and Adaptation.",
    questions: [
      { id: 11, question: "The part of the microscope used to support it when carried is:", options: ["Stage", "Arm", "Base", "Objective"], correctAnswer: "Arm" },
      { id: 12, question: "The platform on which the slide is placed is called:", options: ["Stage", "Condenser", "Nosepiece", "Diaphragm"], correctAnswer: "Stage" },
      { id: 13, question: "The eyepiece lens usually magnifies by:", options: ["5×", "10×", "20×", "40×"], correctAnswer: "10×" },
      { id: 14, question: "Which of the following is NOT a characteristic of living things?", options: ["Growth", "Respiration", "Photosynthesis", "Reproduction"], correctAnswer: "Photosynthesis" },
      { id: 15, question: "The ability of organisms to maintain a stable internal environment is:", options: ["Growth", "Homeostasis", "Adaptation", "Metabolism"], correctAnswer: "Homeostasis" },
      { id: 16, question: "Competition occurs when organisms:", options: ["Live in the same habitat", "Depend on different resources", "Compete for similar resources", "Move to new areas"], correctAnswer: "Compete for similar resources" },
      { id: 17, question: "Which is an example of behavioral adaptation?", options: ["Bird migration", "Thick fur in polar bears", "Spines in cactus", "Large ears in elephants"], correctAnswer: "Bird migration" },
      { id: 18, question: "The natural limit of life in humans is about:", options: ["50 years", "80–120 years", "20 years", "200 years"], correctAnswer: "80–120 years" },
      { id: 19, question: "Which microscope part regulates the amount of light?", options: ["Condenser", "Mirror", "Diaphragm", "Stage"], correctAnswer: "Diaphragm" },
      { id: 20, question: "Homeostasis in humans is maintained by which system?", options: ["Skeletal", "Endocrine and nervous", "Digestive", "Muscular"], correctAnswer: "Endocrine and nervous" }
    ]
  },
  {
    id: "mod3",
    title: "Module 3: Biological Organization",
    description: "Levels of Organization, Tissues, Organs and Systems.",
    questions: [
      { id: 21, question: "Which of the following is the simplest level of biological organization?", options: ["Cell", "Atom", "Tissue", "Organ"], correctAnswer: "Atom" },
      { id: 22, question: "A group of similar cells performing the same function forms:", options: ["Organ", "Tissue", "Organ system", "Population"], correctAnswer: "Tissue" },
      { id: 23, question: "The part of Earth where life exists is:", options: ["Atmosphere", "Biosphere", "Lithosphere", "Hydrosphere"], correctAnswer: "Biosphere" },
      { id: 24, question: "Which tissue connects, supports, and binds other tissues?", options: ["Connective", "Muscular", "Nervous", "Epithelial"], correctAnswer: "Connective" },
      { id: 25, question: "Blood is classified as a:", options: ["Muscular tissue", "Connective tissue", "Epithelial tissue", "Nervous tissue"], correctAnswer: "Connective tissue" },
      { id: 26, question: "Which muscle type is involuntary and non-striated?", options: ["Skeletal", "Cardiac", "Smooth", "Voluntary"], correctAnswer: "Smooth" },
      { id: 27, question: "The largest organ in the human body is:", options: ["Heart", "Liver", "Skin", "Brain"], correctAnswer: "Skin" },
      { id: 28, question: "The kidneys are the main organs of the:", options: ["Urinary system", "Digestive system", "Respiratory system", "Nervous system"], correctAnswer: "Urinary system" },
      { id: 29, question: "Which system provides structural support and protection?", options: ["Muscular system", "Skeletal system", "Endocrine system", "Nervous system"], correctAnswer: "Skeletal system" },
      { id: 30, question: "Which human tissue has the fastest rate of cell division?", options: ["Nervous tissue", "Muscle tissue", "Epithelial tissue", "Connective tissue"], correctAnswer: "Epithelial tissue" }
    ]
  },
  {
    id: "mod5",
    title: "Module 5: Microbiology & Infection",
    description: "Microbes, Infection Control, Transmission, and Immunity.",
    questions: [
      { id: 31, question: "Microbiology is the study of:", options: ["Plants", "Animals", "Microorganisms", "Minerals"], correctAnswer: "Microorganisms" },
      { id: 32, question: "Which microorganism is acellular?", options: ["Bacteria", "Virus", "Protozoa", "Fungi"], correctAnswer: "Virus" },
      { id: 33, question: "Hand hygiene is best achieved by:", options: ["Rinsing with water", "Using alcohol-based hand rub", "Wearing gloves only", "Wiping with tissue"], correctAnswer: "Using alcohol-based hand rub" },
      { id: 34, question: "The most effective way to prevent healthcare-associated infections is:", options: ["Sterilization of air", "Proper hand washing", "Isolation of patients", "Vaccination"], correctAnswer: "Proper hand washing" },
      { id: 35, question: "HIV is primarily transmitted through:", options: ["Air", "Blood and sexual contact", "Water", "Skin contact"], correctAnswer: "Blood and sexual contact" },
      { id: 36, question: "A hospital-acquired infection is also called:", options: ["Zoonotic infection", "Nosocomial infection", "Vector-borne infection", "Community infection"], correctAnswer: "Nosocomial infection" },
      { id: 37, question: "The chain of infection begins with:", options: ["Mode of transmission", "Infectious agent", "Susceptible host", "Portal of entry"], correctAnswer: "Infectious agent" },
      { id: 38, question: "The process of destroying all microorganisms including spores is:", options: ["Cleaning", "Sterilization", "Disinfection", "Sanitation"], correctAnswer: "Sterilization" },
      { id: 39, question: "Which vaccine prevents tuberculosis?", options: ["BCG", "MMR", "Polio", "Tetanus"], correctAnswer: "BCG" },
      { id: 40, question: "Methicillin-resistant Staphylococcus aureus (MRSA) is an example of:", options: ["Viral infection", "Antibiotic-resistant bacteria", "Fungal infection", "Protozoan infection"], correctAnswer: "Antibiotic-resistant bacteria" }
    ]
  },
  {
    id: "mod6",
    title: "Module 6: Blood Components",
    description: "Composition, Functions, Blood Groups, and Disorders.",
    questions: [
      { id: 41, question: "What percentage of blood is plasma?", options: ["25%", "45%", "55%", "65%"], correctAnswer: "55%" },
      { id: 42, question: "The red color of blood is due to:", options: ["Hemoglobin", "Myoglobin", "Albumin", "Fibrin"], correctAnswer: "Hemoglobin" },
      { id: 43, question: "Which blood component is responsible for clotting?", options: ["Plasma", "RBCs", "Platelets", "WBCs"], correctAnswer: "Platelets" },
      { id: 44, question: "Which cell type lacks a nucleus in mammals?", options: ["RBC", "WBC", "Platelet", "Plasma cell"], correctAnswer: "RBC" },
      { id: 45, question: "The universal donor blood group is:", options: ["A", "B", "AB", "O negative"], correctAnswer: "O negative" },
      { id: 46, question: "A person with blood group AB has:", options: ["Only A antigen", "Only B antigen", "Both A and B antigens", "No antigen"], correctAnswer: "Both A and B antigens" },
      { id: 47, question: "Anemia is caused by deficiency of:", options: ["Calcium", "Iron", "Vitamin D", "Vitamin C"], correctAnswer: "Iron" },
      { id: 48, question: "Hemophilia is a disorder of:", options: ["Platelets", "Clotting factors", "RBCs", "Plasma"], correctAnswer: "Clotting factors" },
      { id: 49, question: "Which organ removes old RBCs?", options: ["Kidney", "Liver", "Spleen", "Heart"], correctAnswer: "Spleen" },
      { id: 50, question: "Erythropoietin is produced by:", options: ["Liver", "Kidney", "Heart", "Bone marrow"], correctAnswer: "Kidney" }
    ]
  },
  {
    id: "mod7",
    title: "Module 7: Nutrients & Diet",
    description: "Macronutrients, Vitamins, Minerals, Water, and Balance.",
    questions: [
      { id: 51, question: "Macronutrients include:", options: ["Vitamins and minerals", "Proteins, fats, and carbohydrates", "Water only", "Trace elements"], correctAnswer: "Proteins, fats, and carbohydrates" },
      { id: 52, question: "Which nutrient provides the most energy per gram?", options: ["Carbohydrate", "Protein", "Fat", "Water"], correctAnswer: "Fat" },
      { id: 53, question: "Proteins are composed of:", options: ["Fatty acids", "Amino acids", "Glucose", "Nucleotides"], correctAnswer: "Amino acids" },
      { id: 54, question: "Vitamin C deficiency leads to:", options: ["Rickets", "Scurvy", "Night blindness", "Anemia"], correctAnswer: "Scurvy" },
      { id: 55, question: "Fat-soluble vitamins include:", options: ["A, D, E, K", "B, C", "B only", "C only"], correctAnswer: "A, D, E, K" },
      { id: 56, question: "Calcium is required for:", options: ["Muscle contraction", "Energy production", "Immune defense", "Digestion"], correctAnswer: "Muscle contraction" },
      { id: 57, question: "Iodine deficiency may cause:", options: ["Goiter", "Anemia", "Kwashiorkor", "Rickets"], correctAnswer: "Goiter" },
      { id: 58, question: "Water makes up approximately what percentage of the human body?", options: ["30%", "50%", "60%", "70%"], correctAnswer: "60%" },
      { id: 59, question: "A balanced diet provides:", options: ["All essential nutrients", "Only proteins", "Only fats", "Only vitamins"], correctAnswer: "All essential nutrients" },
      { id: 60, question: "Iron from plant sources is called:", options: ["Heme iron", "Non-heme iron", "Calcium iron", "Magnesium iron"], correctAnswer: "Non-heme iron" }
    ]
  }
];
