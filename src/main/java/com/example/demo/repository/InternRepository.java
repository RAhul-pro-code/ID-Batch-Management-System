package com.example.demo.repository;

import com.example.demo.entity.Intern;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface InternRepository extends JpaRepository<Intern, Long> {
    Optional<Intern> findByEmail(String email);
    List<Intern> findByBatch_Id(Long batchId);
    List<Intern> findByStatus(String status);
    List<Intern> findByCollege(String college);
    List<Intern> findBySpecialization(String specialization);
    
    List<Intern> findByBatch_IdAndStatus(Long batchId, String status);
}
