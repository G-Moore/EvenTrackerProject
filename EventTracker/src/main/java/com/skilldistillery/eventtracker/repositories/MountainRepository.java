package com.skilldistillery.eventtracker.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.eventtracker.entities.Mountain;

public interface MountainRepository extends JpaRepository<Mountain, Integer> {

}
