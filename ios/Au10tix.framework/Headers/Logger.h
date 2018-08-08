//
//  Logger.h
//  Au10tix
//
//  Created by Rustem on 18.01.17.
//  Copyright © 2017 senticore.com. All rights reserved.
//

#ifndef Logger_h
#define Logger_h

/**
 * Contains log messages from c++ library
 */

@interface Logger : NSObject

+ (id) sharedLogger;
- (void) LogMessage: (NSString *)argument;
- (NSString *) getLogString: (NSString *)argument;
- (NSMutableData *) getLogData: (NSString *)argument;
- (void) clearLog;

@end

#endif /* Logger_h */
