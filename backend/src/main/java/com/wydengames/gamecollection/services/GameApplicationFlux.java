package com.wydengames.gamecollection.services;

public interface GameApplicationFlux <T, R> {
    R process(T request);
}
