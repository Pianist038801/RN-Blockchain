//
//  objc-find-corners-result.h
//  Au10tix
//
//  Created by Rustem on 28.07.16.
//  Copyright © 2016 senticore.com. All rights reserved.
//

#import <AVFoundation/AVFoundation.h>
#import "Quadrangle.h"

#ifndef FindCornersResult_h
#define FindCornersResult_h


/*
 * Result of findCorners method
 * Contains flags of image processing and quadrangle of the found document
 *
 *@see findCorners
 */


@interface  FindCornersResult : NSObject
-(NSDictionary *) getFlags;
@property bool ok;
@property bool flash;
@property bool dark;
@property bool foundQuadrangle;
@property Quadrangle *quadrangle;


@end

#endif /* FindCornersResult_h */
