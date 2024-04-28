from faker import Faker
import random
from datetime import datetime, timedelta
import bcrypt

fake = Faker()

salt = bcrypt.gensalt()

# Generate dummy data for user_doctor table
num_doctors = 100
doctors = []
for i in range(num_doctors):
    first_name = fake.first_name()
    last_name = fake.last_name()
    email = f"{first_name.lower()}.{last_name.lower()}@example.com"
    # Generate a random password, except for the first doctor
    if i == 0:
        password = "doctor123"
    else:
        password = fake.password(length=12, special_chars=True, digits=True, upper_case=True, lower_case=True)
    # Hash the password with bcrypt
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
    doctor = {
        "firstname": first_name,
        "lastname": last_name,
        "email": email,
        "password": hashed_password.decode('utf-8'),
        "gender": random.choice(["M", "F", "O"]),
        "birthdate": fake.date_of_birth(minimum_age=25, maximum_age=70),
        "specialization_type": random.choice(["Anaesthetists", "Emergency medicine", "Oncologists", "Ophthalmology", "Pathology", "Physicians", "Psychiatrists", "Radiologists"]),
        "work_address": fake.street_address(),
        "work_city": fake.city(),
        "work_zip": fake.zipcode(),
        "role": "DOCTOR"
    }
    doctors.append(doctor)

# Generate dummy data for user_patient table
num_patients = 300
patients = []
for i in range(num_patients):
    first_name = fake.first_name()
    last_name = fake.last_name()
    email = f"{first_name.lower()}.{last_name.lower()}@example.com"
    # Generate a random password, except for the first patient
    if i == 0:
        password = "patient123"
    else:
        password = fake.password(length=12, special_chars=True, digits=True, upper_case=True, lower_case=True)
    # Hash the password with bcrypt
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
    patient = {
        "firstname": first_name,
        "lastname": last_name,
        "email": email,
        "password": hashed_password.decode('utf-8'),
        "gender": random.choice(["M", "F", "O"]),
        "birthdate": fake.date_of_birth(minimum_age=18, maximum_age=90),
        "address": fake.street_address(),
        "city": fake.city(),
        "zip": fake.zipcode(),
        "insurance_type": random.choice(["Public", "Private"]),
        "role": "PATIENT"
    }
    patients.append(patient)

# Generate dummy data for personal_info table
personal_infos = []

for patient_id in range(2, num_patients + 2):
    # Fetch patient details for the current patient_id
    patient_details = patients[patient_id - 2]  # Subtract 1 to account for 0-based indexing
    
    firstname = patient_details["firstname"]
    lastname = patient_details["lastname"]
    gender = patient_details["gender"]
    birthdate = patient_details["birthdate"]
    address = patient_details["address"]
    city = patient_details["city"]
    zip_code = patient_details["zip"]
    
    patient_identifier = fake.unique.random_number(digits=6)  # Assuming a unique identifier for each patient
    bloodType = random.choice(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'])
    lastUpdated = fake.date_time_between(start_date='-2y', end_date='now')

    personal_info = {
        "patient_id": patient_id,
        "firstname": firstname,
        "lastname": lastname,
        "patient_identifier": patient_identifier,
        "gender": gender,
        "birthdate": birthdate,
        "bloodType": bloodType,
        "lastUpdated": lastUpdated,
        "address": address,
        "city": city,
        "zip": zip_code,
    }

    personal_infos.append(personal_info)

# Generate dummy data for emergency_contact table
emergency_contacts = []

for patient_id in range(2, num_patients + 2):
    # Generate up to 2 emergency contacts for each patient
    num_contacts = 2  # Always generate 2 entries
    actual_num_contacts = random.randint(0, 2)
    # Generate up to 2 emergency contacts for each patient
    for _ in range(num_contacts):
        if _ < actual_num_contacts:
            fullname = fake.name()
            relationship = random.choice([
                "Parent",
                "Spouse",
                "Sibling",
                "Child",
                "Grandparent",
                "Aunt/Uncle",
                "Cousin",
                "Friend",
                "Neighbor",
                "Co-worker",
                "Guardian",
                "Other Relative",
                "Domestic Partner",
                "Legal Representative",
                "Healthcare Proxy",
                "Spouse's Family Member",
                "Roommate",
                "No Known Emergency Contact"
            ])
            contactNumber = fake.phone_number()
        else:
            fullname = None
            relationship = None
            contactNumber = None
        
        emergency_contact = {
            "patient_id": patient_id,
            "fullname": fullname,
            "relationship": relationship,
            "contactNumber": contactNumber,
        }

        emergency_contacts.append(emergency_contact)

# Generate dummy data for insurance_info table
insurance_infos = []

for patient_id in range(2, num_patients + 2):
    insuranceCarrier = random.choice([
        "Blue Cross Blue Shield",
        "Aetna",
        "UnitedHealthcare",
        "Cigna",
        "Humana",
        "Medicare",
        "Medicaid",
        "Tricare",
        "Kaiser Permanente",
        "Anthem",
        "Molina Healthcare",
        "Centene Corporation",
        "Catastrophic Health Insurance",
        "Private Health Insurance",
        "Self-Pay/No Insurance",
        "Employer-Sponsored Insurance",
        "Veterans Affairs (VA) Insurance",
        "International Travel Insurance",
        "Health Savings Account (HSA) Plans",
        "Child Health Insurance Program (CHIP)"
    ])
    insurancePlan = random.choice([
        "Health Maintenance Organization (HMO)",
        "Preferred Provider Organization (PPO)",
        "Exclusive Provider Organization (EPO)",
        "Point of Service (POS)",
        "High Deductible Health Plan (HDHP)",
        "Medicare Advantage (Part C)",
        "Medigap (Medicare Supplement)",
        "Medicaid Managed Care",
        "Health Savings Account (HSA)",
        "Flexible Spending Account (FSA)",
        "Dental Insurance",
        "Vision Insurance",
        "Prescription Drug Plan (Part D)",
        "Behavioral Health Plan",
        "Long-Term Care Insurance",
        "Travel Insurance (for international coverage)",
        "Short-Term Health Insurance",
        "Catastrophic Health Insurance"
    ])
    contactNumber = fake.phone_number()
    policyNumber = fake.unique.random_number(digits=8)  # Assuming a unique policy number
    groupNumber = fake.unique.random_number(digits=6)    # Assuming a unique group number
    socialSecurityNumber = fake.unique.random_number(digits=9)  # Assuming a unique SSN
    
    insurance_info = {
        "patient_id": patient_id,
        "insuranceCarrier": insuranceCarrier,
        "insurancePlan": insurancePlan,
        "contactNumber": contactNumber,
        "policyNumber": policyNumber,
        "groupNumber": groupNumber,
        "socialSecurityNumber": socialSecurityNumber,
    }

    insurance_infos.append(insurance_info)

# Generate dummy data for physician_info table
physician_infos = []

for patient_id in range(2, num_patients + 2):
    # Generate up to 5 physician entries for each patient
    num_physicians = 5
    actual_num_physicians = random.randint(0, 5)

    for _ in range(num_physicians):
        if _ < actual_num_physicians:
            name = fake.name()
            speciality = random.choice([
                "Anaesthetists",
                "Emergency medicine",
                "Oncologists",
                "Ophthalmology",
                "Pathology",
                "Physicians",
                "Psychiatrists",
                "Radiologists",
            ])
            phone = fake.phone_number()
            address = fake.street_address()
            notes = random.choice([
                "Annual Physical Examination",
                "Vaccination: Flu shot",
                "Blood Pressure Check",
                "Cholesterol Test",
                "Prescription: Antibiotics",
                "Surgical Procedure: Appendectomy",
                "Diagnostic Test: X-ray",
                "Medication Adjustment: Increased dosage",
                "Physical Therapy Session",
                "Counseling Session: Mental Health",
                "Lab Work: Blood Glucose Test",
                "Allergy Testing",
                "Emergency Room Visit",
                "Prenatal Check-Up",
                "Radiation Therapy Session",
                "Dental Cleaning",
                "Suture Removal",
                "Orthopedic Consultation",
                "Psychological Assessment",
                "Gastrointestinal Endoscopy",
                "Cardiac Stress Test",
                "Immunization: COVID-19 vaccine",
                "Electrocardiogram (ECG/EKG)",
                "Surgery Follow-Up",
                "Biopsy: Skin",
                "Casting for Fracture",
                "Audiology Test: Hearing Assessment",
                "Medication: Insulin Injection",
                "Home Health Care Visit",
                "Speech Therapy Session",
                "Hospice Care Consultation",
                "Alternative Medicine: Acupuncture",
                "Genetic Testing",
                "Dietary Consultation",
                "Social Worker Visit",
                "Medication: Painkiller Prescription",
                "Wound Dressing Change",
                "Immunotherapy Treatment",
                "Hormone Replacement Therapy",
                "MRI Scan",
                "Occupational Therapy Session",
                "Podiatry Consultation",
                "Chemotherapy Session",
                "Medication: Antidepressant",
                "Nutritional Counseling",
                "Respiratory Therapy Session",
                "CT Scan",
                "Home Care Nursing Visit",
                "Physical Examination: Well-child visit"
            ])
        else:
            name = None
            speciality = None
            phone = None
            address = None
            notes = None


        physician_info = {
            "patient_id": patient_id,
            "name": name,
            "speciality": speciality,
            "phone": phone,
            "address": address,
            "notes": notes,
        }

        physician_infos.append(physician_info)

# Generate dummy data for medical_condition table
medical_conditions = []

for patient_id in range(2, num_patients + 2):
    # Determine if the patient has medical conditions or not
    has_conditions = random.choice([True, False])
    
    if has_conditions:
        # Generate a random number of medical conditions (up to a limit) for each patient
        num_conditions = random.randint(1, 5)  # Adjust the limit as needed
        
        # Generate a list of random medical conditions
        conditions = random.sample([
            "Hypertension (High Blood Pressure)",
            "Type 2 Diabetes",
            "Asthma",
            "Arthritis",
            "High Cholesterol",
            "Obesity",
            "Heart Disease",
            "COPD (Chronic Obstructive Pulmonary Disease)",
            "Depression",
            "Anxiety",
            "Thyroid Disorder",
            "Cancer",
            "Stroke",
            "Epilepsy",
            "Osteoporosis",
            "Migraines",
            "Alzheimer's Disease",
            "Parkinson's Disease",
            "Kidney Disease",
            "Liver Disease",
            "Gastroesophageal Reflux Disease (GERD)",
            "Crohn's Disease",
            "Ulcerative Colitis",
            "Multiple Sclerosis",
            "Rheumatoid Arthritis",
            "HIV/AIDS",
            "Hepatitis",
            "Autism Spectrum Disorder",
            "Bipolar Disorder",
            "Schizophrenia",
            "Eating Disorders (e.g., Anorexia, Bulimia)",
            "Chronic Pain Syndrome",
            "Fibromyalgia",
            "Polycystic Ovary Syndrome (PCOS)",
            "Endometriosis",
            "Chronic Fatigue Syndrome",
            "Celiac Disease",
            "Lupus",
            "Allergies",
            "Hemophilia",
            "Sickle Cell Disease",
            "Huntington's Disease",
            "Amyotrophic Lateral Sclerosis (ALS)",
            "Tourette Syndrome",
            "Psoriasis",
            "Eczema",
            "Interstitial Cystitis",
            "Sleep Apnea",
            "Attention-Deficit/Hyperactivity Disorder (ADHD)",
            "Autism",
            "Down Syndrome",
            "Cerebral Palsy",
            "Spinal Cord Injury",
            "Blindness",
            "Deafness",
            "Intellectual Disabilities",
            "Developmental Delays",
            "Other (Specify)"
        ], num_conditions)

        # Concatenate the conditions into a single string separated by commas
        medical_condition = ", ".join(conditions)
    else:
        num_conditions = 0
        medical_condition = None  # No medical conditions, set to NULL

    condition_data = {
        "patient_id": patient_id,
        "medicalCondition": medical_condition,
    }

    medical_conditions.append(condition_data)

# Generate dummy data for allergies table
allergies_data = []

for patient_id in range(2, num_patients + 2):
    # Determine if the patient has allergies or not
    has_allergies = random.choice([True, False])
    
    if has_allergies:
        # Generate a random number of allergies (up to a limit) for each patient
        num_allergies = random.randint(1, 5)  # Adjust the limit as needed
        
        # Generate a list of random allergies
        allergies = random.sample([
            "Penicillin",
            "Amoxicillin",
            "Sulfonamides",
            "Aspirin",
            "Ibuprofen",
            "Naproxen",
            "Codeine",
            "Morphine",
            "Shellfish",
            "Peanuts",
            "Tree Nuts (e.g., almonds, cashews)",
            "Milk",
            "Eggs",
            "Soy",
            "Wheat",
            "Fish",
            "Sesame",
            "Latex",
            "Pollen",
            "Animal Dander",
            "Insect Stings (e.g., bee, wasp)",
            "Dust Mites",
            "Mold",
            "Nickel",
            "Sunlight (Photosensitivity)",
            "Dye (e.g., Red Dye #40)",
            "Fragrances/Perfumes",
            "Medication Allergies (specify)",
            "Food Additives",
            "Chemical Sensitivity",
            "Topical Antibiotics (e.g., Neosporin)",
            "Other (Specify)"
        ], num_allergies)

        # Concatenate the allergies into a single string separated by commas
        allergies_str = ", ".join(allergies)
    else:
        num_allergies = 0
        allergies_str = None  # No allergies, set to NULL

    allergies_entry = {
        "patient_id": patient_id,
        "allergies": allergies_str,
    }

    allergies_data.append(allergies_entry)

# Generate dummy data for medication table (always 5 entries for each patient)
medication_data = []

for patient_id in range(2, num_patients + 2):
    # Generate up to 5 medication entries for each patient
    num_medications = 5  # Always generate 5 entries
    actual_medications = random.randint(0, 5)

    for _ in range(num_medications):
        if _ < actual_medications:
            name = fake.word(ext_word_list=["Aspirin", "Ibuprofen", "Lisinopril", "Simvastatin", "Levothyroxine", "Metformin", "Amlodipine"])
            dose = fake.word(ext_word_list=["10 mg", "20 mg", "50 mg", "100 mg", "200 mg", "500 mg", "1000 mg"])
            frequency = random.choice(["Once daily", "Twice daily", "Three times daily", "As needed"])
            indication = random.choice([
                "Pain Management",
                "Fever Reduction",
                "Hypertension (High Blood Pressure)",
                "Type 2 Diabetes",
                "Asthma",
                "Arthritis",
                "High Cholesterol",
                "Thyroid Disorder",
                "Depression",
                "Anxiety",
                "Heart Disease",
                "Allergy Relief",
                "Antibacterial/Antibiotic",
                "Anti-Inflammatory",
                "Anticoagulation (Blood Thinning)",
                "Gastroesophageal Reflux Disease (GERD)",
                "Bronchitis",
                "Cough and Cold Symptoms",
                "Migraine Prevention",
                "Prenatal Vitamins",
                "Osteoporosis",
                "Cancer Treatment",
                "Epilepsy",
                "Parkinson's Disease",
                "Alzheimer's Disease",
                "Multiple Sclerosis",
                "Rheumatoid Arthritis",
                "Antiretroviral (HIV/AIDS Treatment)",
                "Hepatitis Treatment",
                "Psychiatric Medication",
                "Birth Control",
                "Hormone Replacement Therapy",
                "Nausea and Vomiting",
                "Chronic Pain Management",
                "Fibromyalgia",
                "Inflammatory Bowel Disease (IBD)",
                "Gout",
                "Mental Health Stabilization",
                "Blood Pressure Reduction",
                "Sleep Aid",
                "Attention-Deficit/Hyperactivity Disorder (ADHD)",
                "Immunosuppression (e.g., after transplant surgery)",
                "Seizure Control",
                "Skin Conditions (e.g., Acne, Psoriasis)",
                "Chronic Obstructive Pulmonary Disease (COPD)",
                "Antifungal",
                "Diuretic",
                "Erectile Dysfunction",
                "Pulmonary Hypertension",
                "Eating Disorder Treatment",
                "Anti-Seizure (Antiepileptic)",
                "Antinausea (e.g., for chemotherapy)",
                "Antipsychotic",
                "Substance Abuse Treatment",
                "Muscle Relaxant",
                "Anemia Treatment",
                "Methadone Maintenance Therapy",
                "Opioid Use Disorder Treatment",
                "Blood Sugar Control (Diabetes)",
                "Immunization",
                "Other (Specify)"
            ])
            note = random.choice([
                "Take with food",
                "Take on an empty stomach",
                "Take with plenty of water",
                "Do not crush or chew tablets",
                "May cause drowsiness; avoid driving or operating machinery",
                "Avoid alcohol while taking this medication",
                "Notify healthcare provider of any adverse effects",
                "Monitor blood pressure regularly",
                "Check blood sugar levels as directed",
                "Increase dosage if symptoms worsen",
                "Take one tablet every 12 hours",
                "Take as needed for pain",
                "Complete the full course of antibiotics",
                "Store in a cool, dry place",
                "Refrigerate medication",
                "Shake well before using",
                "Injection site: Left thigh",
                "Injection site: Abdomen",
                "Rotate injection sites",
                "Apply to affected area sparingly",
                "Wear sunscreen when outdoors",
                "Avoid prolonged sun exposure",
                "Patient is allergic to this medication (list allergies)",
                "Emergency contact information on file",
                "Dispense a 30-day supply",
                "Dispense a 90-day supply",
                "Patient requested generic equivalent",
                "Patient prefers liquid form",
                "Monitor for signs of drug interactions",
                "Discontinue medication if severe side effects occur",
                "Monitor for drug-drug interactions with other medications (list them)",
                "Medication can cause dizziness; rise slowly from sitting or lying position",
                "Consider dose adjustment for renal impairment",
                "Consider dose adjustment for hepatic impairment",
                "Patient is pregnant; assess risk vs. benefit",
                "Patient is breastfeeding; assess safety for the infant",
                "Patient prefers brand-name medication",
                "Patient requested a medication refill",
                "Patient is non-compliant with medication regimen",
                "Patient is experiencing medication non-response",
                "Patient is experiencing medication side effects",
                "Patient reported a drug allergy (describe reaction)",
                "Adjust dosage according to patient weight",
                "Adjust dosage according to patient age",
                "Dispense a 7-day supply",
                "Dispense a 60-day supply",
                "Observe for drug interactions with over-the-counter medications",
                "Patient is using this medication for an off-label indication",
                "Monitor for medication dependence or abuse",
                "Additional monitoring required for medication titration",
                "Medication administered by IV infusion",
                "Medication administered by subcutaneous injection",
                "Patient is on a tapering schedule for this medication",
                "Dispense medication in a blister pack for adherence",
                "Medication has a narrow therapeutic range; monitor closely",
                "Medication may cause weight gain",
                "Medication may cause weight loss",
                "Medication may affect thyroid function",
                "Medication may cause changes in mood or behavior",
                "Review medication administration technique with patient",
                "Patient is on concomitant therapies (list other medications)",
                "Medication dose requires adjustment during pregnancy",
                "Medication dose requires adjustment during breastfeeding",
            ])
        else:
            name = None
            dose = None
            frequency = None
            indication = None
            note = None

        medication_entry = {
            "patient_id": patient_id,
            "name": name,
            "dose": dose,
            "frequency": frequency,
            "indication": indication,
            "note": note,
        }

        medication_data.append(medication_entry)

# Generate dummy data for vaccination table
vaccinations = []

for patient_id in range(2, num_patients + 2):
    # Generate up to 9 vaccination entries for each patient
    num_vaccinations = 9
    
    actual_num_vaccinations = random.randint(0, 9)
    
    for _ in range(num_vaccinations):
        if _ < actual_num_vaccinations:
            vaccination = fake.word(ext_word_list=["COVID-19 Vaccine", "Influenza Vaccine", "Measles, Mumps, and Rubella (MMR) Vaccine", "Polio Vaccine", "Hepatitis B Vaccine", "Tetanus, Diphtheria, and Pertussis (Tdap) Vaccine", "Hepatitis A Vaccine", "Pneumococcal Vaccine", "Shingles Vaccine", "Human Papillomavirus (HPV) Vaccine"])
            vaccine_type = fake.word(ext_word_list=["First Dose", "Second Dose", "Booster Shot"])
            dateReceived = fake.date_of_birth(minimum_age=1, maximum_age=90).strftime('%Y-%m-%d')
        else:
            vaccination = None
            vaccine_type = None
            dateReceived = None
        
        vaccine_entry = {
            "patient_id": patient_id,
            "vaccination": vaccination,
            "type": vaccine_type,
            "dateReceived": dateReceived,
        }

        vaccinations.append(vaccine_entry)

# Generate dummy data for additional_notes table
additional_notes = []

for patient_id in range(2, num_patients + 2):
    # Determine if the patient has additional notes or not
    has_notes = random.choice([True, False])
    
    if has_notes:
        # Generate a random number of additional notes (up to a limit) for each patient
        num_notes = random.randint(1, 5)  # Adjust the limit as needed
        
        # Generate a list of random additional notes
        notes = random.sample([
            "Patient has a family history of heart disease.",
            "Patient is allergic to latex; use latex-free equipment.",
            "Patient has a history of non-compliance with medication.",
            "Patient experiences chronic pain; assess pain levels regularly.",
            "Patient has a history of alcohol and substance abuse.",
            "Patient prefers communication via email for appointment reminders.",
            "Patient is a caregiver for an elderly parent; consider caregiver stress.",
            "Patient recently traveled to a malaria-endemic region.",
            "Patient has a history of adverse reactions to specific medications (list them).",
            "Patient is on a special diet (e.g., gluten-free, vegetarian).",
            "Patient has difficulty with mobility and requires assistance with transfers.",
            "Patient is pregnant; monitor maternal and fetal health.",
            "Patient is a healthcare worker with potential occupational exposure to infectious diseases.",
            "Patient is experiencing significant stress due to work-related issues.",
            "Patient has a legal healthcare proxy; contact proxy for major decisions.",
            "Patient prefers a female/male healthcare provider.",
            "Patient has difficulty with hearing; use written communication when necessary.",
            "Patient is a minor; obtain parental consent for treatment.",
            "Patient has a history of multiple hospitalizations; review previous records.",
            "Patient has a history of falls; assess fall risk and implement precautions.",
            "Patient prefers alternative medicine treatments; consider integrative care options.",
            "Patient is experiencing financial hardship; discuss cost-effective treatment options.",
            "Patient is in a clinical trial; coordinate care with trial protocols.",
            "Patient has a history of non-English-speaking family members; arrange translation services as needed.",
            "Patient is non-binary and prefers gender-neutral pronouns.",
            "Patient has a history of migraines with aura; consider migraine-specific treatments.",
            "Patient has a history of self-harm/suicidal ideation; ensure appropriate mental health support.",
            "Patient has a service animal; accommodate the presence of the animal during appointments.",
            "Patient has religious or cultural dietary restrictions; respect these preferences.",
            "Patient has a history of sleep apnea; monitor sleep patterns and consider a sleep study.",
            "Patient has a documented advance directive; ensure compliance with patient's wishes.",
            "Patient is under the care of multiple specialists; coordinate care with other providers.",
        ], num_notes)

        # Concatenate the notes into a single string separated by commas
        additional_note = ", ".join(notes)
    else:
        num_notes = 0
        additional_note = None  # No medical conditions, set to NULL

    note_data = {
        "patient_id": patient_id,
        "notes": additional_note,
    }

    additional_notes.append(note_data)

# Generate dummy data for appointments table
num_appointments = 7000
appointments = []

for _ in range(num_appointments):
    appointment_date = fake.date_between(start_date='+50d', end_date='+150d')
    appointment_time = fake.time(pattern='%H:%M:%S')
    
    # Choose a random doctor
    doctor = random.choice(doctors)
    
    appointment_doctor_type = doctor["specialization_type"]
    appointment_doctor_id = doctors.index(doctor) + 1  # Assuming doctor IDs are based on their position in the list
    appointment_reason = random.choice([
        "Routine Check-Up",
        "Fever and Respiratory Symptoms",
        "Annual Physical Examination",
        "Vaccination",
        "Chronic Condition Management",
        "Pain or Discomfort",
        "Allergies",
        "Skin Issues",
        "Gastrointestinal Problems",
        "Eye Problems",
        "Ear, Nose, and Throat (ENT) Issues",
        "Women's Health",
        "Men's Health",
        "Pediatric Check-Up",
        "Mental Health Evaluation",
        "Musculoskeletal Issues",
        "Neurological Symptoms",
        "Dental Problems",
        "Surgery Consultation",
        "Weight Management",
        "High Blood Pressure (Hypertension)",
        "Diabetes Management",
        "Cancer Screening",
        "Heart Problems",
        "Respiratory Conditions",
        "Urinary Tract Infection (UTI)",
        "Kidney Stones",
        "Thyroid Disorder",
        "Liver Disease",
        "Blood Disorders",
        "Osteoporosis Evaluation",
        "Sexually Transmitted Infection (STI) Testing",
        "Pregnancy Confirmation",
        "Fertility Consultation",
        "Stroke Risk Assessment",
        "Eating Disorder Evaluation",
        "HIV Testing",
        "Travel Vaccination",
        "Cholesterol Check",
        "Sleep Disorder Evaluation",
        "Immunodeficiency Evaluation",
        "Hearing Loss Evaluation",
        "Alternative Medicine Consultation",
        "Podiatry (Foot and Ankle) Issues",
        "Chronic Fatigue Syndrome Evaluation",
        "Bariatric (Weight Loss) Surgery Consultation",
        "Genetic Counseling",
        "Occupational Health Assessment"
    ])
    appointment_status = random.choice(['requested', 'canceled', 'accepted', 'declined'])

    # Assign a random patient ID from the user_patient table
    appointment_patient_id = random.randint(2, num_patients+1)  # Assuming patient IDs range from 1 to num_patients

    appointment = {
        "appointment_date": appointment_date,
        "appointment_time": appointment_time,
        "appointment_doctor_type": appointment_doctor_type,
        "appointment_doctor_id": appointment_doctor_id,
        "appointment_reason": appointment_reason,
        "appointment_status": appointment_status,
        "user_patient_id": appointment_patient_id,
    }

    appointments.append(appointment)

# Generate dummy data for health_records_permission table
num_permissions = 3000
permissions = []  # Use a list to store permission data

for _ in range(num_permissions):
    doctor_id = random.randint(1, num_doctors)  # Assuming doctor IDs range from 1 to num_doctors
    patient_id = random.randint(2, num_patients+1)  # Assuming patient IDs range from 1 to num_patients
    status = random.choice(['requested', 'done'])
    
    # If the status is 'requested', set permission to NULL; if 'done', set to 0 or 1
    if status == 'requested':
        permission = None
    else:
        permission = random.choice([0, 1])

    # Ensure unique pairings of doctor_id and patient_id
    while (doctor_id, patient_id) in [(item["doctor_id"], item["patient_id"]) for item in permissions]:
        doctor_id = random.randint(1, num_doctors)
        patient_id = random.randint(2, num_patients+1)
    
    permission_data = {
        "doctor_id": doctor_id,
        "patient_id": patient_id,
        "permission": permission,
        "status": status,
    }

    permissions.append(permission_data)

# Save the generated data as SQL INSERT statements in a file
with open('dummy_data.sql', 'w') as f:
    f.write(f"USE `health-app`;\n")
    for doctor in doctors:
        values = ', '.join([f'"{doctor[key]}"' if doctor[key] is not None else 'NULL' for key in doctor.keys()])
        f.write(f"INSERT INTO user_doctor ({', '.join(doctor.keys())}) VALUES ({values});\n")
    for patient in patients:
        values = ', '.join([f'"{patient[key]}"' if patient[key] is not None else 'NULL' for key in patient.keys()])
        f.write(f"INSERT INTO user_patient ({', '.join(patient.keys())}) VALUES ({values});\n")
    for personal_info in personal_infos:
        values = ', '.join([f'"{personal_info[key]}"' if personal_info[key] is not None else 'NULL' for key in personal_info.keys()])
        f.write(f"INSERT INTO personal_info ({', '.join(personal_info.keys())}) VALUES ({values});\n")
    for emergency_contact in emergency_contacts:
        values = ', '.join([f'"{emergency_contact[key]}"' if emergency_contact[key] is not None else 'NULL' for key in emergency_contact.keys()])
        f.write(f"INSERT INTO emergency_contact ({', '.join(emergency_contact.keys())}) VALUES ({values});\n")
    for insurance_info in insurance_infos:
        values = ', '.join([f'"{insurance_info[key]}"' if insurance_info[key] is not None else 'NULL' for key in insurance_info.keys()])
        f.write(f"INSERT INTO insurance_info ({', '.join(insurance_info.keys())}) VALUES ({values});\n")
    for physician_info in physician_infos:
        values = ', '.join([f'"{physician_info[key]}"' if physician_info[key] is not None else 'NULL' for key in physician_info.keys()])
        f.write(f"INSERT INTO physician_info ({', '.join(physician_info.keys())}) VALUES ({values});\n")
    for condition_data in medical_conditions:
        values = ', '.join([f'"{condition_data[key]}"' if condition_data[key] is not None else 'NULL' for key in condition_data.keys()])
        f.write(f"INSERT INTO medical_condition ({', '.join(condition_data.keys())}) VALUES ({values});\n")
    for allergies_entry in allergies_data:
        values = ', '.join([f'"{allergies_entry[key]}"' if allergies_entry[key] is not None else 'NULL' for key in allergies_entry.keys()])
        f.write(f"INSERT INTO allergies ({', '.join(allergies_entry.keys())}) VALUES ({values});\n")
    for medication_entry in medication_data:
        values = ', '.join([f'"{medication_entry[key]}"' if medication_entry[key] is not None else 'NULL' for key in medication_entry.keys()])
        f.write(f"INSERT INTO medication ({', '.join(medication_entry.keys())}) VALUES ({values});\n")
    for vaccination in vaccinations:
        values = ', '.join([f'"{vaccination[key]}"' if vaccination[key] is not None else 'NULL' for key in vaccination.keys()])
        f.write(f"INSERT INTO vaccination ({', '.join(vaccination.keys())}) VALUES ({values});\n")
    for note_data in additional_notes:
        values = ', '.join([f'"{note_data[key]}"' if note_data[key] is not None else 'NULL' for key in note_data.keys()])
        f.write(f"INSERT INTO additional_notes ({', '.join(note_data.keys())}) VALUES ({values});\n")
    for appointment in appointments:
        values = ', '.join([f'"{appointment[key]}"' if appointment[key] is not None else 'NULL' for key in appointment.keys()])
        f.write(f"INSERT INTO appointments ({', '.join(appointment.keys())}) VALUES ({values});\n")
    for permission in permissions:
        values = ', '.join([f'"{permission[key]}"' if permission[key] is not None else 'NULL' for key in permission.keys()])
        f.write(f"INSERT INTO health_records_permission ({', '.join(permission.keys())}) VALUES ({values});\n")