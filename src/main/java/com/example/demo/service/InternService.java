package com.example.demo.service;

import com.example.demo.entity.Intern;
import com.example.demo.repository.InternRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class InternService {

    @Autowired
    private InternRepository internRepository;

    @Autowired
    private BatchService batchService;

    public Intern createIntern(Intern intern) {
        intern.setStatus("ENROLLED");
        // If client provided only batchId (transient), resolve and set Batch entity
        if (intern.getBatch() == null && intern.getBatchId() != null) {
            batchService.getBatchById(intern.getBatchId()).ifPresent(intern::setBatch);
        }
        if (intern.getBatch() == null || intern.getBatch().getId() == null) {
            throw new IllegalArgumentException("batchId is required and must refer to an existing batch");
        }

        Intern savedIntern = internRepository.save(intern);
        if (savedIntern.getBatch() != null && savedIntern.getBatch().getId() != null) {
            batchService.incrementEnrolledCount(savedIntern.getBatch().getId());
        }
        return savedIntern;
    }

    public Optional<Intern> getInternById(Long id) {
        return internRepository.findById(id);
    }

    public List<Intern> getAllInterns() {
        return internRepository.findAll();
    }

    public Intern updateIntern(Long id, Intern internDetails) {
        Optional<Intern> intern = internRepository.findById(id);
        if (intern.isPresent()) {
            Intern existingIntern = intern.get();
            existingIntern.setFirstName(internDetails.getFirstName());
            existingIntern.setLastName(internDetails.getLastName());
            existingIntern.setEmail(internDetails.getEmail());
            existingIntern.setPhoneNumber(internDetails.getPhoneNumber());
            existingIntern.setCollege(internDetails.getCollege());
            existingIntern.setDegree(internDetails.getDegree());
            existingIntern.setSpecialization(internDetails.getSpecialization());
            existingIntern.setDateOfBirth(internDetails.getDateOfBirth());
            existingIntern.setAddress(internDetails.getAddress());
            existingIntern.setStatus(internDetails.getStatus());
            existingIntern.setPerformanceScore(internDetails.getPerformanceScore());
            existingIntern.setRemarks(internDetails.getRemarks());
            return internRepository.save(existingIntern);
        }
        return null;
    }

    public void deleteIntern(Long id) {
        Optional<Intern> intern = internRepository.findById(id);
        if (intern.isPresent()) {
            Long batchId = intern.get().getBatch().getId();
            internRepository.deleteById(id);
            batchService.decrementEnrolledCount(batchId);
        }
    }

    public List<Intern> getInternsByBatchId(Long batchId) {
        return internRepository.findByBatch_Id(batchId);
    }

    public List<Intern> getInternsByStatus(String status) {
        return internRepository.findByStatus(status);
    }

    public List<Intern> getInternsByCollege(String college) {
        return internRepository.findByCollege(college);
    }

    public List<Intern> getInternsBySpecialization(String specialization) {
        return internRepository.findBySpecialization(specialization);
    }

    public List<Intern> getInternsByBatchIdAndStatus(Long batchId, String status) {
        return internRepository.findByBatch_IdAndStatus(batchId, status);
    }

    public Optional<Intern> getInternByEmail(String email) {
        return internRepository.findByEmail(email);
    }

    public void updateInternPerformance(Long internId, Double performanceScore) {
        Optional<Intern> intern = internRepository.findById(internId);
        if (intern.isPresent()) {
            intern.get().setPerformanceScore(performanceScore);
            internRepository.save(intern.get());
        }
    }
}
