package com.skilldistillery.eventtracker.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.eventtracker.entities.Mountain;
import com.skilldistillery.eventtracker.services.MountainService;

@RestController
@RequestMapping("api")
public class MountainController {
	@Autowired
	private MountainService svc;

	@GetMapping("mountains")
	public List<Mountain> allMountains() {
		return svc.listAllMountains();
	}
	
	@GetMapping("mountains/{mid}")
	public Mountain singleMountain(@PathVariable Integer mid) {
		return svc.listSingleMountain(mid);
	}
	
	@PostMapping("mountains/create")
	public Mountain createMountain(@RequestBody Mountain mountain) {
		return svc.create(mountain);
	}
	
	@DeleteMapping("mountains/delete/{mid}")
	public boolean deleteMountain(@PathVariable Integer mid) {
		return svc.delete(mid);
	}
	
	@PutMapping("mountains/update/{mid}")
	public Mountain updateMountain(@PathVariable Integer mid, @RequestBody Mountain newMountain) {
		return svc.update(mid, newMountain);
	}


}