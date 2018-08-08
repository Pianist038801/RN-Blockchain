//
//  Quadrangle.h
//  Au10tix
//
//  Created by Rustem on 28.07.16.
//  Copyright © 2016 senticore.com. All rights reserved.
//

#ifndef Quadrangle_h
#define Quadrangle_h
#import "Dot.h"

/**
 * Class contains 4 parameters - instances of Dot class
 *
 * @see Dot
 */
@interface Quadrangle : NSObject

@property Dot *a;
@property Dot *b;
@property Dot *c;
@property Dot *d;


/**
 * Initialization function of class (Initializing Quadrangle with four dots)
 */
- (id) initQuadrangle:(Dot *)a b:(Dot*)b c:(Dot*)c d:(Dot*)d;


/**
 * Initializing Quadrangle with NSDictionary
 */

- (id) initQuadrangleFromDictionary: (NSDictionary*) dictionary;

/**
 * Method for converting Quadrangle into NSDictionary
 */
- (NSDictionary *) toDictionary;

/**
 * returns value on axis corresponding the argument (a, b, c, d);
 */
- (NSNumber*) getXFromDot: (NSString *) arg;
- (NSNumber*) getYFromDot: (NSString *) arg;

/**
 * sets value on axis for a corresponding argument (a, b, c, d)
 */
- (void) setXToDot: (NSString *) arg value: (NSNumber*) value;
- (void) setYToDot: (NSString *) arg value: (NSNumber*) value;

@end
#endif /* Quadrangle_h */
