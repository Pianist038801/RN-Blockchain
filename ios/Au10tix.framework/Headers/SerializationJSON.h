//
//  SerializationJSON.h
//  toJSON
//
//  Created by Andrey on 23.06.17.
//  Copyright © 2017 Andrey. All rights reserved.
//

#import <Foundation/Foundation.h>

/**
 * Class for transformation the object into JSON format
 */

@interface SerializationJSON : NSObject

/**
 * The method transforms an object into JSON and returns NSString
 */
- (NSString *)JSONString : (id<NSObject>) object ;

/**
 * The method transforms an object into NSDictionary
 */
-(NSDictionary*) getDictionaryForJSON : (id<NSObject>) object;

@end
