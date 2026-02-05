package com.example.demo.controller;

import com.example.demo.entity.Intern;
import com.example.demo.service.InternService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/interns")
@CrossOrigin(origins = "*")
public class InternController {

    @Autowired
    private InternService internService;

    @PostMapping
    public ResponseEntity<Intern> createIntern(@RequestBody Intern intern) {
        try {
            Intern createdIntern = internService.createIntern(intern);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdIntern);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Intern> getInternById(@PathVariable Long id) {
        Optional<Intern> intern = internService.getInternById(id);
        return intern.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<Intern>> getAllInterns() {
        List<Intern> interns = internService.getAllInterns();
        return ResponseEntity.ok(interns);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Intern> updateIntern(@PathVariable Long id, @RequestBody Intern internDetails) {
        Intern updatedIntern = internService.updateIntern(id, internDetails);
        if (updatedIntern != null) {
            return ResponseEntity.ok(updatedIntern);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteIntern(@PathVariable Long id) {
        internService.deleteIntern(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/batch/{batchId}")
    public ResponseEntity<List<Intern>> getInternsByBatchId(@PathVariable Long batchId) {
        List<Intern> interns = internService.getInternsByBatchId(batchId);
        return ResponseEntity.ok(interns);
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<Intern>> getInternsByStatus(@PathVariable String status) {
        List<Intern> interns = internService.getInternsByStatus(status);
        return ResponseEntity.ok(interns);
    }

    @GetMapping("/college/{college}")
    public ResponseEntity<List<Intern>> getInternsByCollege(@PathVariable String college) {
        List<Intern> interns = internService.getInternsByCollege(college);
        return ResponseEntity.ok(interns);
    }

    @GetMapping("/specialization/{specialization}")
    public ResponseEntity<List<Intern>> getInternsBySpecialization(@PathVariable String specialization) {
        List<Intern> interns = internService.getInternsBySpecialization(specialization);
        return ResponseEntity.ok(interns);
    }

    @GetMapping("/batch/{batchId}/status/{status}")
    public ResponseEntity<List<Intern>> getInternsByBatchIdAndStatus(
            @PathVariable Long batchId,
            @PathVariable String status) {
        List<Intern> interns = internService.getInternsByBatchIdAndStatus(batchId, status);
        return ResponseEntity.ok(interns);
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<Intern> getInternByEmail(@PathVariable String email) {
        Optional<Intern> intern = internService.getInternByEmail(email);
        return intern.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/performance")
    public ResponseEntity<Void> updateInternPerformance(
            @PathVariable Long id,
            @RequestParam Double performanceScore) {
        internService.updateInternPerformance(id, performanceScore);
        return ResponseEntity.ok().build();
    }
}
