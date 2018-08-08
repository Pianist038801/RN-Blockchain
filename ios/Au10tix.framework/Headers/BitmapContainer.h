//
//  BitmapContainer.h
//  Au10tix
//
//  Created by rigel on 02/08/16.
//  Copyright © 2016 senticore.com. All rights reserved.
//


#ifndef BitmapContainer_h
#define BitmapContainer_h

#import <AVFoundation/AVFoundation.h>

/*
 * The protocol for storage of bitmap. It is created by means of the static createContainer method of the class BitmapContainerHelper
 *
 * @see BitmapContainerHelper
 */
@protocol BitmapContainer <NSObject>

-(NSInteger) getWidth;
-(NSInteger) getHeight;

@end

#endif /* IImageContainer_h */
