//
//  Dot.h
//  Au10tix
//
//  Created by Rustem on 28.07.16.
//  Copyright © 2016 senticore.com. All rights reserved.
//

#ifndef Dot_h
#define Dot_h

#import <AVFoundation/AVFoundation.h>

/**
 * The class creating a point in rectangular system of coordinates.
 * x - an abscissa of the point, y - an ordinate of the point
 */
@interface Dot: NSObject 

@property NSNumber* x;
@property NSNumber* y;


/**
 * Initialization of point with x,y values with NSNumber type
 */
-(id) initDot: (NSNumber*)x y:(NSNumber*)y;

/**
 * Initialization of point with x,y values with NSDictionary type
 */
-(id) initDotFromDictionary: (NSDictionary*) dictionary;

/**
 * Initialization of point with x,y values with float type
 */
-(id) initDotFromFloat:(float)x y:(float)y;

/**
 * Initialization of point with x,y values with double type
 */
-(id) initDotFromDouble:(double)x y:(double)y;

@end
#endif
