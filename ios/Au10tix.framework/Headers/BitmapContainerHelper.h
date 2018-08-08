//
//  BitmapContainerFactory.h
//  Au10tix
//
//  Created by rigel on 02/08/16.
//  Copyright © 2016 senticore.com. All rights reserved.
//

#import <AVFoundation/AVFoundation.h>
#import "BitmapContainer.h"
#import "Quadrangle.h"

#ifndef BitmapContainerFactory_h
#define BitmapContainerFactory_h



/**
 *
 * Helper class to work with BitmapContainer
 *
 */
@interface BitmapContainerHelper : NSObject

/**
 * Method for creating an empty BitmapContainer
 */
+ (id <BitmapContainer>) createBitmapContainer;


/*
 * Filling BitmapContainer from jpegData
 *
 * @param container - empty BitmapContainer
 * @param jpegData - jpeg data (from camera)
 * @param width - width of image
 * @param height - height of image
 *
 * @see id <BitmapContainer>
 */
+ (void) initFromJpeg: (id <BitmapContainer>) container jpegData: (NSData*) jpegData width:(NSInteger) width height:(NSInteger) height;


/**
 * Filling BitmapContainer from pngData
 *
 * @param container - empty BitmapContainer
 * @param pngData - png data (from camera)
 * @param width - width of image
 * @param height - height of image
 *
 * @see id <BitmapContainer>
 *
 */
+ (void) initFromPNG: (id <BitmapContainer>) container pngData: (NSData*) pngData width:(NSInteger) width height:(NSInteger) height;


/**
 * Filling BitmapContainer from CMSampleBufferRef
 * @param container -  BitmapContainer
 * @param buffer - CMSampleBufferRef
 */
+ (int) initFromBuffer: (id <BitmapContainer>) container buffer: (CMSampleBufferRef) buffer;


/**
 * Sets Exif data into container
 */
+ (void) setExifBlock: (id <BitmapContainer>) container meta:(NSDictionary*) meta;


/**
 * Converting from BitmapContainer to NSData (to jpeg)
 * @param container -  BitmapContainer
 */
+ (NSData* ) toJpeg: (id <BitmapContainer>) container;


/**
 * Converting from BitmapContainer to NSData (to png)
 * @param container -  BitmapContainer
 */
+ (NSData* ) toPNG: (id <BitmapContainer>) container;


/**
 * Converting from BitmapContainer to NSData (origin)
 * @param container -  BitmapContainer
 */
+ (NSData* ) getOriginJpeg: (id <BitmapContainer>) container;


/**
 * Rotaing BitmapContainer by given angle
 * @param container -  BitmapContainer
 * @param angle -  int the given angle
 */
+ (void) rotate: (id<BitmapContainer>) container angle: (int) angle;


/**
 * Reflect BitmapContainer horizontally
 * @param container -  BitmapContainer
 */
+ (void) mirror: (id<BitmapContainer>) container;

@end

#endif /* BitmapContainerFactory_h */
