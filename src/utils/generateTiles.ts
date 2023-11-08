import { BoardSizeType, TileType } from "../@types/types";

export const generateTiles = (boardSize: BoardSizeType): TileType[] => {
    
    return (
        new Array(boardSize) // Creating an array with a length determined by the boardSize variable. 
        .fill(undefined) // filling all the elements of the array with undefined values.
        .map((_, index) => index + 1) // assigning a value to each element based on its index
        .sort(() => Math.random() - 0.5) // This comparison function generates random comparison values between -0.5 and 0.5 for each pair of elements in the array, resulting in a random order of the elements.for each pair if the random number is positive the order will be switched if not it will keep the same.
        .map((tileNumber, index) => ({value: tileNumber, index: index})) // maping over each element of the sorted array and transforms it into an object.
    )
}