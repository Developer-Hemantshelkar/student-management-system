package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Student;
import com.example.demo.service.StudentService;


@RestController
@RequestMapping("/students")
@CrossOrigin(origins = "http://localhost:3000")
public class StudentController {
	@Autowired
	private StudentService  service;
	
	@PostMapping
	  public Student addStudent(@RequestBody Student student) {
        return service.saveStudent(student);
    }
	@GetMapping
	 public List<Student> getAllStudents() {
        return service.getAllStundent();
    }
	@GetMapping("/{id}")
	public Student getStudent(@PathVariable Long id) {
		return service.getStudentById(id);
	}
	@PutMapping("/{id}")
	public Student updateStudent(
            @PathVariable Long id,
            @RequestBody Student student) {
        return service.updateStudent(id, student);
    }
	@DeleteMapping("/{id}")
    public String deleteStudent(@PathVariable Long id) {
        service.deleteStudent(id);
        return "Student Deleted";
    }
	
}
