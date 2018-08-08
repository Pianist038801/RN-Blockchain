//
//  FindBarcodeResult.h
//  Au10tix
//
//  Created by Andrey on 20.06.17.
//  Copyright © 2017 senticore.com. All rights reserved.
//

/**
 * A returned structure of barcode search results
 * @param RawData - contains data array
 * @param PointsCoordinates - coordiantes of the barcode found on image
 * @param Format - format of the found barcode // BC_TYPE_CODE128 1 ; BC_TYPE_PDF417  2
 * @param Orientation - orientation of the found barcode // 0 - horizontal ; 1 - vertical
 * @param Status - status of search result //0 - not found ; 1- ok ; 2 - possibly barcode is present
 */

#import <Foundation/Foundation.h>

@interface FindBarcodeResult : NSObject


@property NSArray* RawData;
@property NSArray* PointsCoordinates;
@property int Format;
@property int Orientation;
@property int Status;

@end
