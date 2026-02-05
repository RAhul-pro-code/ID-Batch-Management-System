package com.example.demo.repository;

import com.example.demo.entity.Batch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface BatchRepository extends JpaRepository<Batch, Long> {
    Optional<Batch> findByBatchName(String batchName);
    List<Batch> findByStatus(String status);
    List<Batch> findByTechnology(String technology);
    List<Batch> findByStartDateBetween(LocalDate startDate, LocalDate endDate);
}
