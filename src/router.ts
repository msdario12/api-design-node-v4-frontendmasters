import { Router } from 'express';
import { body, oneOf, validationResult } from 'express-validator';
import { handleInputErrors } from './modules/middleware';
import {
	createProduct,
	deleteProduct,
	getOneProduct,
	getProducts,
} from './handlers/product';
import {
	createUpdate,
	deleteUpdate,
	getOneUpdate,
	getUpdates,
	updateUpdate,
} from './handlers/update';

// Router no es una función constructora, por eso no lleva el new adelante
const router = Router();
// Un router en express es como una parte del objeto "app" que creamos con express, puede tener su propia configuración o funciones. Es como subdividirlo un poco.
// App siempre va a ser la aplicación global
//? Por ejemplo, todo lo que pase por un router puede ser que tenga que ser autenticado, pero no asi toda la APP global
// Entonces tenemos un subrouter para todo lo que necesite autenticación y otro para lo que no.
// *Primero suele definir los router y luego los handlers, que seria la lógica dentro de cada router.

// :id significa que es una variable, es algo que no sabemos que valor tendrá, solo que lo podemos referencia luego. Es un parámetro dinámico

/**
 * !Product CRUD
 *  */

//? Get all products
router.get('/product', getProducts);
router.get('/product/:id', getOneProduct);
router.put(
	'/product/:id',
	body('name').isString(),
	handleInputErrors,
	(req, res) => {
		// Only business logic here
	}
);
router.post(
	'/product',
	body('name').isString(),
	handleInputErrors,
	createProduct
);
router.delete('/product/:id', deleteProduct);

/**
 * !update CRUD
 *  */

router.get('/update', getUpdates);
router.get('/update/:id', getOneUpdate);
router.put(
	'/update/:id',
	body('title').optional(),
	body('body').optional,
	body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']).optional(),
	body('version').optional(),
	updateUpdate
);
router.post(
	'/update',
	body('title').optional(),
	body('body').optional,
	body('productId').exists().isString(),
	createUpdate
);
router.delete('/update/:id', deleteUpdate);

/**
 * !updatepoint CRUD
 *  */

router.get('/updatepoint', () => {});
router.get('/updatepoint/:id', () => {});
router.put(
	'/updatepoint/:id',
	body('name').optional().isString(),
	body('description').optional().isString(),
	() => {}
);
router.post(
	'/updatepoint',
	body('name').isString(),
	body('description').isString(),
	body('updateId').exists().isString(),
	() => {}
);
router.delete('/updatepoint/:id', () => {});

export default router;
