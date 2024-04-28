const { PersonalInfo, EmergencyContact, InsuranceInfo, PhysicianInfo, MedicalCondition, Allergies, Medication, Vaccination, AdditionalNotes, Permission } = require('./health-records.model');
const {
    // user/patient add health records for the first time
    savePersonalInfo,
    saveEmergencyContact,
    saveInsuranceInfo,
    savePhysicianInfo,
    saveMedicalCondition,
    saveAllergies,
    saveMedications,
    saveVaccination,
    saveAdditionalNotes,

    // user/patient edits health records
    editPersonalInfo,
    editEmergencyContact,
    editInsuranceInfo,
    editPhysicianInfo,
    editMedicalCondition,
    editAllergies,
    editMedications,
    editVaccination,
    editAdditionalNotes,

    // get health records of user/patient
    getPersonalInfo,
    getEmergencyContact,
    getInsuranceInfo,
    getPhysicianInfo,
    getMedicalCondition,
    getAllergies,
    getMedications,
    getVaccination,
    getAdditionalNotes,

    // doctor requests to see health records of user/patient
    requestPermission,
    updatePermission,
    getPermission,
    getRequestedPermission
} = require('./health-records.service');

module.exports = {
    // functions to save health records of an user/a patient for the first time
    savePersonalInfo : (req, res) => {
        let personalInfo = PersonalInfo.from_create_edit(req, function(r) { return r.params.userId; });
        savePersonalInfo(personalInfo.userId, personalInfo, (err, results)=>{
        if(err){
            console.log(err);
            return res.status(500).json({
                success: 0,
                message: "Database connection error"
            });
        }
        return res.status(200).json({
            success:1,
            data: results
        });
    });
   },
   saveEmergencyContact : (req, res) => {
        let emergencyContact = EmergencyContact.from_create_edit(req, function(r) { return r.params.userId; });
        saveEmergencyContact(emergencyContact.userId, emergencyContact, (err, results)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success:1,
                data: results
            });
        });
    },
    saveInsuranceInfo : (req, res) => {
        let insuranceInfo = InsuranceInfo.from_create_edit(req, function(r) { return r.params.userId; });
        saveInsuranceInfo(insuranceInfo.userId, insuranceInfo, (err, results)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success:1,
                data: results
            });
        });
    },
    savePhysicianInfo : (req, res) => {
        let physicianInfo = PhysicianInfo.from_create_edit(req, function(r) { return r.params.userId; });
        savePhysicianInfo(physicianInfo.userId, physicianInfo, (err, results)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success:1,
                data: results
            });
        });
    },
    saveMedicalCondition : (req, res) => {
        let medicalCondition = MedicalCondition.from_create_edit(req, function(r) { return r.params.userId; });
        saveMedicalCondition(medicalCondition.userId, medicalCondition, (err, results)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success:1,
                data: results
            });
        });
    },
    saveAllergies : (req, res) => {
        let allergies = Allergies.from_create_edit(req, function(r) { return r.params.userId; });
        saveAllergies(allergies.userId, allergies, (err, results)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success:1,
                data: results
            });
        });
    },
    saveMedications : (req, res) => {
        let medication = Medication.from_create_edit(req, function(r) { return r.params.userId; });
        saveMedications(medication.userId, medication, (err, results)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success:1,
                data: results
            });
        });
    },
    saveVaccination : (req, res) => {
        let vaccination = Vaccination.from_create_edit(req, function(r) { return r.params.userId; });
        saveVaccination(vaccination.userId, vaccination, (err, results)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success:1,
                data: results
            });
        });
    },
    saveAdditionalNotes : (req, res) => {
        let additionalNotes = AdditionalNotes.from_create_edit(req, function(r) { return r.params.userId; });
        saveAdditionalNotes(additionalNotes.userId, additionalNotes, (err, results)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success:1,
                data: results
            });
        });
    },


    // functions to edit existing health records of user/patient
    editPersonalInfo : (req, res) => {
        let personalInfo = PersonalInfo.from_create_edit(req, function(r) { return r.params.userId; });
        editPersonalInfo(personalInfo.userId, personalInfo, (err, results)=>{
        if(err){
            console.log(err);
            return res.status(500).json({
                success: 0,
                message: "Database connection error"
            });
        }
        return res.status(200).json({
            success:1,
            data: results
        });
    });
   },
   editEmergencyContact : (req, res) => {
        let emergencyContact = EmergencyContact.from_create_edit(req, function(r) { return r.params.userId; });
        editEmergencyContact(emergencyContact.userId, emergencyContact, (err, results)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success:1,
                data: results
            });
        });
    },
    editInsuranceInfo : (req, res) => {
        let insuranceInfo = InsuranceInfo.from_create_edit(req, function(r) { return r.params.userId; });
        editInsuranceInfo(insuranceInfo.userId, insuranceInfo, (err, results)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success:1,
                data: results
            });
        });
    },
    editPhysicianInfo : (req, res) => {
        let physicianInfo = PhysicianInfo.from_create_edit(req, function(r) { return r.params.userId; });
        editPhysicianInfo(physicianInfo.userId, physicianInfo, (err, results)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success:1,
                data: results
            });
        });
    },
    editMedicalCondition : (req, res) => {
        let medicalCondition = MedicalCondition.from_create_edit(req, function(r) { return r.params.userId; });
        editMedicalCondition(medicalCondition.userId, medicalCondition, (err, results)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success:1,
                data: results
            });
        });
    },
    editAllergies : (req, res) => {
        let allergies = Allergies.from_create_edit(req, function(r) { return r.params.userId; });
        editAllergies(allergies.userId, allergies, (err, results)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success:1,
                data: results
            });
        });
    },
    editMedications : (req, res) => {
        let medication = Medication.from_create_edit(req, function(r) { return r.params.userId; });
        editMedications(medication.userId, medication, (err, results)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success:1,
                data: results
            });
        });
    },
    editVaccination : (req, res) => {
        let vaccination = Vaccination.from_create_edit(req, function(r) { return r.params.userId; });
        editVaccination(vaccination.userId, vaccination, (err, results)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success:1,
                data: results
            });
        });
    },
    editAdditionalNotes : (req, res) => {
        let additionalNotes = AdditionalNotes.from_create_edit(req, function(r) { return r.params.userId; });
        editAdditionalNotes(additionalNotes.userId, additionalNotes, (err, results)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success:1,
                data: results
            });
        });
    },


    // get health records of user/patient
    getPersonalInfo: (req,res) => {
        const userId = req.params.userId;
        getPersonalInfo(userId, (err, results)=> {
            if(err){
                console.log(err);
                return;
            }
            if(!results){
                return res.json({
                    success: 0,
                    message: 'Record not found'
                });
            }
            return res.json({
                success : 1,
                data: results
            });
        });
    },
    getEmergencyContact: (req,res) => {
        const userId = req.params.userId;
        getEmergencyContact(userId, (err, results)=> {
            if(err){
                console.log(err);
                return;
            }
            if(!results){
                return res.json({
                    success: 0,
                    message: 'Record not found'
                });
            }
            return res.json({
                success : 1,
                data: results
            });
        });
    },
    getInsuranceInfo: (req,res) => {
        const userId = req.params.userId;
        getInsuranceInfo(userId, (err, results)=> {
            if(err){
                console.log(err);
                return;
            }
            if(!results){
                return res.json({
                    success: 0,
                    message: 'Record not found'
                });
            }
            return res.json({
                success : 1,
                data: results
            });
        });
    },
    getPhysicianInfo: (req,res) => {
        const userId = req.params.userId;
        getPhysicianInfo(userId, (err, results)=> {
            if(err){
                console.log(err);
                return;
            }
            if(!results){
                return res.json({
                    success: 0,
                    message: 'Record not found'
                });
            }
            return res.json({
                success : 1,
                data: results
            });
        });
    },
    getMedicalCondition: (req,res) => {
        const userId = req.params.userId;
        getMedicalCondition(userId, (err, results)=> {
            if(err){
                console.log(err);
                return;
            }
            if(!results){
                return res.json({
                    success: 0,
                    message: 'Record not found'
                });
            }
            return res.json({
                success : 1,
                data: results
            });
        });
    },
    getAllergies: (req,res) => {
        const userId = req.params.userId;
        getAllergies(userId, (err, results)=> {
            if(err){
                console.log(err);
                return;
            }
            if(!results){
                return res.json({
                    success: 0,
                    message: 'Record not found'
                });
            }
            return res.json({
                success : 1,
                data: results
            });
        });
    },
    getMedications: (req,res) => {
        const userId = req.params.userId;
        getMedications(userId, (err, results)=> {
            if(err){
                console.log(err);
                return;
            }
            if(!results){
                return res.json({
                    success: 0,
                    message: 'Record not found'
                });
            }
            return res.json({
                success : 1,
                data: results
            });
        });
    },
    getVaccination: (req,res) => {
        const userId = req.params.userId;
        getVaccination(userId, (err, results)=> {
            if(err){
                console.log(err);
                return;
            }
            if(!results){
                return res.json({
                    success: 0,
                    message: 'Record not found'
                });
            }
            return res.json({
                success : 1,
                data: results
            });
        });
    },
    getAdditionalNotes: (req,res) => {
        const userId = req.params.userId;
        getAdditionalNotes(userId, (err, results)=> {
            if(err){
                console.log(err);
                return;
            }
            if(!results){
                return res.json({
                    success: 0,
                    message: 'Record not found'
                });
            }
            return res.json({
                success : 1,
                data: results
            });
        });
    },


    // functions for health records permission for doctor
    requestPermission : (req, res) => {
        let permission = Permission.from_request(req, function(r) { return r.params.doctorId; });
        requestPermission(permission.doctorId, permission, (err, results)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success:1,
                data: results
            });
        });
    },
    // user/patient allows or deny perission
    updatePermission : (req, res) => {
        let permission = Permission.from_update(req, function(r) { return r.params.userId; });
        updatePermission(permission.userId, permission, (err, results)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success:1,
                data: results
            });
        });
    },
    // get all requested permissions for doctor regardless of whether permission has status 'requested' or 'done'
    getPermission: (req,res) => {
        const doctorId = req.params.doctorId;
        getPermission(doctorId, (err, results)=> {
            if(err){
                console.log(err);
                return;
            }
            if(!results){
                return res.json({
                    success: 0,
                    message: 'Record not found'
                });
            }
            return res.json({
                success : 1,
                data: results
            });
        });
    },
    // get requested permission for user/patient
    getRequestedPermission: (req,res) => {
        const patientId = req.params.patientId;
        getRequestedPermission(patientId, (err, results)=> {
            if(err){
                console.log(err);
                return;
            }
            if(!results){
                return res.json({
                    success: 0,
                    message: 'Record not found'
                });
            }
            return res.json({
                success : 1,
                data: results
            });
        });
    },
};