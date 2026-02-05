package com.example.demo.service;

import com.example.demo.entity.Batch;
import com.example.demo.repository.BatchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class BatchService {

    @Autowired
    private BatchRepository batchRepository;

    public Batch createBatch(Batch batch) {
        batch.setEnrolledCount(0);
        batch.setStatus("ACTIVE");
        return batchRepository.save(batch);
    }

    public Optional<Batch> getBatchById(Long id) {
        return batchRepository.findById(id);
    }

    public List<Batch> getAllBatches() {
        return batchRepository.findAll();
    }

    public Batch updateBatch(Long id, Batch batchDetails) {
        Optional<Batch> batch = batchRepository.findById(id);
        if (batch.isPresent()) {
            Batch existingBatch = batch.get();
            existingBatch.setBatchName(batchDetails.getBatchName());
            existingBatch.setStartDate(batchDetails.getStartDate());
            existingBatch.setEndDate(batchDetails.getEndDate());
            existingBatch.setTechnology(batchDetails.getTechnology());
            existingBatch.setCapacity(batchDetails.getCapacity());
            existingBatch.setDescription(batchDetails.getDescription());
            existingBatch.setStatus(batchDetails.getStatus());
            return batchRepository.save(existingBatch);
        }
        return null;
    }

    public void deleteBatch(Long id) {
        batchRepository.deleteById(id);
    }

    public List<Batch> getBatchesByStatus(String status) {
        return batchRepository.findByStatus(status);
    }

    public List<Batch> getBatchesByTechnology(String technology) {
        return batchRepository.findByTechnology(technology);
    }

    public List<Batch> getBatchesByDateRange(LocalDate startDate, LocalDate endDate) {
        return batchRepository.findByStartDateBetween(startDate, endDate);
    }

    public void incrementEnrolledCount(Long batchId) {
        Optional<Batch> batch = batchRepository.findById(batchId);
        if (batch.isPresent()) {
            Batch b = batch.get();
            b.setEnrolledCount(b.getEnrolledCount() + 1);
            batchRepository.save(b);
        }
    }

    public void decrementEnrolledCount(Long batchId) {
        Optional<Batch> batch = batchRepository.findById(batchId);
        if (batch.isPresent()) {
            Batch b = batch.get();
            if (b.getEnrolledCount() > 0) {
                b.setEnrolledCount(b.getEnrolledCount() - 1);
                batchRepository.save(b);
            }
        }
    }
}
