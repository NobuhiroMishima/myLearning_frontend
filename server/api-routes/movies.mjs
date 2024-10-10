import express from 'express';
import { body } from "express-validator"
import {getAllMovies, getMovieById, deleteMovie, registMovie, updateMovie } from '../controllers/movies.mjs';
import { requestErrorHandler } from '../helpers/helper.mjs';

const router = express.Router();

router.get('/', requestErrorHandler(getAllMovies))

router.get('/:id', requestErrorHandler(getMovieById))

router.delete('/:id', requestErrorHandler(deleteMovie))

router.post('/',
    body('title').notEmpty(),
    body('instructor').notEmpty(),
    body('rating').notEmpty().isInt({min: 1, max: 5}),
    body('comment').notEmpty(),
    requestErrorHandler(registMovie)
)

router.patch('/:id',
    body('title').optional().notEmpty(),
    body('instructor').optional().notEmpty(),
    body('rating').optional().notEmpty().isInt({min: 1, max: 5}),
    body('comment').optional().notEmpty(),
    requestErrorHandler(updateMovie)
)



export default router;