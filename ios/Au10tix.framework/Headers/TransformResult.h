//
//  TransformResult.h
//  Au10tix
//
//  Created by Rustem on 28.07.16.
//  Copyright © 2016 senticore.com. All rights reserved.
//

#import <AVFoundation/AVFoundation.h>
#import "BitmapContainer.h"

#ifndef TransformResult_h
#define TransformResult_h

/**
 *  Results of Transform. Contains a conatiner with transformed image
 *  @see id<BitmapContainer>
 */
@interface TransformResult : NSObject

@property id<BitmapContainer> container;

@end

#endif /* TransformResult_h */
