package com.skilldistillery.eventtracker.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.eventtracker.entities.Mountain;
import com.skilldistillery.eventtracker.repositories.MountainRepository;

@Service
public class MountainServiceImpl implements MountainService {

	@Autowired
	private MountainRepository mtn;

	@Override
	public List<Mountain> listAllMountains() {
		return mtn.findAll();
	}

	@Override
	public Mountain listSingleMountain(Integer mid) {
		Optional<Mountain> mountainOpt = mtn.findById(mid);
		Mountain mountain = null;
		if (mountainOpt.isPresent()) {
			mountain = mountainOpt.get();
		} else {
			return null;
		}
		return mountain;
	}

	@Override
	public Mountain create(Mountain mountain) {
		return mtn.saveAndFlush(mountain);

	}

	@Override
	public Mountain update(Integer mid, Mountain newMountain) {
		Optional<Mountain> mountainOpt = mtn.findById(mid);
		Mountain mountainUpdated = null;
		if (mountainOpt.isPresent()) {
			mountainUpdated = mountainOpt.get();
			newMountain.setId(mountainUpdated.getId());
			mountainUpdated = newMountain;
			mtn.saveAndFlush(mountainUpdated);
		} else {
			return null;
		}
		return mountainUpdated;
	}

	@Override
	public boolean delete(Integer mid) {
		Mountain mountain = null;
		Optional<Mountain> mountainOpt = mtn.findById(mid);
		if (mountainOpt.isPresent()) {
			mountain = mountainOpt.get();
			mtn.delete(mountain);
			return true;
		}
		return false;
	}

}
