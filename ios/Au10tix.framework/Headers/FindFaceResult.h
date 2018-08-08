//
//  Header.h
//  Au10tix
//
//  Created by Rustem on 19.08.16.
//  Copyright © 2016 senticore.com. All rights reserved.
//

#import <AVFoundation/AVFoundation.h>
#import "Quadrangle.h"
#import "LivenessResult.h"

#ifndef FindFaceResult_h
#define FindFaceResult_h


/**
 * Result of findFace method
 * Contains flags of image processing and quadrangle of the found face
 *
 *@see findCorners
 */

@interface  FindFaceResult : NSObject

-(NSDictionary *) getFlags;

@property bool ok;
@property LivenessResult* liveness;
@property NSString* livenesslog;
@property bool foundQuadrangle;

@property Quadrangle *quadrangle;

@property LivenessResult* livenessResult;

@end

#endif /* FindCornersResult_h */
