package com.example.demo.controller;

import com.example.demo.entity.Batch;
import com.example.demo.service.BatchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/batches")
@CrossOrigin(origins = "*")
public class BatchController {

    @Autowired
    private BatchService batchService;

    @PostMapping
    public ResponseEntity<Batch> createBatch(@RequestBody Batch batch) {
        Batch createdBatch = batchService.createBatch(batch);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdBatch);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Batch> getBatchById(@PathVariable Long id) {
        Optional<Batch> batch = batchService.getBatchById(id);
        return batch.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<Batch>> getAllBatches() {
        List<Batch> batches = batchService.getAllBatches();
        return ResponseEntity.ok(batches);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Batch> updateBatch(@PathVariable Long id, @RequestBody Batch batchDetails) {
        Batch updatedBatch = batchService.updateBatch(id, batchDetails);
        if (updatedBatch != null) {
            return ResponseEntity.ok(updatedBatch);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBatch(@PathVariable Long id) {
        batchService.deleteBatch(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<Batch>> getBatchesByStatus(@PathVariable String status) {
        List<Batch> batches = batchService.getBatchesByStatus(status);
        return ResponseEntity.ok(batches);
    }

    @GetMapping("/technology/{technology}")
    public ResponseEntity<List<Batch>> getBatchesByTechnology(@PathVariable String technology) {
        List<Batch> batches = batchService.getBatchesByTechnology(technology);
        return ResponseEntity.ok(batches);
    }

    @GetMapping("/daterange")
    public ResponseEntity<List<Batch>> getBatchesByDateRange(
            @RequestParam LocalDate startDate,
            @RequestParam LocalDate endDate) {
        List<Batch> batches = batchService.getBatchesByDateRange(startDate, endDate);
        return ResponseEntity.ok(batches);
    }
}
