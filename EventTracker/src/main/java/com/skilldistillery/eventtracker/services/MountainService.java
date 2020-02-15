package com.skilldistillery.eventtracker.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.skilldistillery.eventtracker.entities.Mountain;

@Service
public interface MountainService {

	List<Mountain> listAllMountains();

	Mountain create(Mountain mountain);

	boolean delete(Integer mid);

	Mountain update(Integer mid, Mountain newMountain);

	Mountain listSingleMountain(Integer mid);
	
	
}
