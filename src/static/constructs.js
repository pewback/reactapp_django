import axios from 'axios'
import React, {useState, useEffect, useContext} from 'react'
import AuthContext from '../context/AuthContext'

export const filterBoards = (boards) => {
    const starredBoards = [];
    const userBoards = []; // Array of board objects
    const projectBoards = []; // Array of project objects with boards key as we need titles
    if (!boards) return [userBoards, projectBoards, starredBoards];

    for (let i = 0; i < boards.length; i++) {
        let board = boards[i];
        if ("title" in board.owner) {
            let project = projectBoards.find(
                (project) => project.title === board.owner.title
            );
            if (!project) {
                projectBoards.push({
                    title: board.owner.title,
                    id: board.owner.id,
                    boards: [board],
                });
            } else {
                project.boards.push(board);
            }
        } else {
            userBoards.push(board);
        }
        if (board.is_starred) starredBoards.push(board);
    }
    

    return [userBoards, projectBoards, starredBoards];
};

export const filterByProjectIdBoards = (boards,projectId) => {

    const byProjectIdBoards = []; // Array of project objects with boards key as we need titles
    // if (!boards) return [byProjectIdBoards];

    for (let i = 0; i < boards.length; i++) {
        let board = boards[i];
        if (board.owner.id===projectId) {

                byProjectIdBoards.push(board);

        }

    }
    return [byProjectIdBoards];
};


