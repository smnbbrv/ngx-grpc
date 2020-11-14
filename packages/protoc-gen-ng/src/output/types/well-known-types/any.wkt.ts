import { ExternalDependencies } from '../../misc/dependencies';
import { Printer } from '../../misc/printer';
import { WKT } from '../wkt';

export class AnyWKT implements WKT {

  printStaticMethods(printer: Printer) {
    printer.addLine(`
      private static prefix = 'type.googleapis.com/';

      /**
       * Create a new Any instance with a packed message
       */
      static pack(msg: GrpcMessage) {
        const any = new Any();

        any.pack(msg);

        return any;
      }
    `);
  }

  printMemberMethods(printer: Printer) {
    printer.addDeps(
      ExternalDependencies.GrpcMessage,
      ExternalDependencies.GrpcMessageClass,
      ExternalDependencies.GrpcMessagePool,
    );

    printer.addLine(`
      /**
       * Get the packed message id based on typeUrl.
       * If no typeUrl is provided null is returned.
       */
      getPackedMessageId() {
        if (!this.typeUrl) {
          return null;
        }

        if (!this.typeUrl.startsWith(Any.prefix)) {
          throw new Error(\`Type URL does not start with \${Any.prefix}\`);
        }

        return this.typeUrl.substr(Any.prefix.length);
      }

      /**
       * Get the type of the packed message.
       * Requires predefined GrpcMessagePool with expected message types within.
       * If no type is found within the pool the error is thrown, unless throwWhenNotInThePool is set to false; in this case null will be returned.
       */
      getPackedMessageType(messagePool: GrpcMessagePool, throwWhenNotInThePool = true) {
        const id = this.getPackedMessageId();

        if (!id) {
          return null;
        }

        const msgClass = messagePool.get(id);

        if (!msgClass) {
          if (throwWhenNotInThePool) {
            throw new Error(\`Message with identifier '\${this.typeUrl}' is not present in message pool\`);
          } else {
            return null;
          }
        }

        return msgClass;
      }

      /**
       * Unpack the current value into a message.
       * Requires predefined GrpcMessagePool with expected message types within.
       * If no type is found within the pool the error is thrown.
       */
      unpack<M extends GrpcMessage>(messagePool: GrpcMessagePool): M {
        const messageClass = this.getPackedMessageType(messagePool);

        if (!messageClass) {
          throw new Error(\`Message type cannot be resolved\`);
        }

        if (!this.value) {
          throw new Error(\`Cannot unpack value that is unset\`);
        }

        return messageClass.deserializeBinary(this.value) as M;
      }

      /**
       * Pack the given message into current Any instance
       */
      pack(msg: GrpcMessage) {
        const { id } = msg.constructor as GrpcMessageClass<any>;

        if (!id) {
          throw new Error(\`Message is invalid or does not have an id\`);
        }

        this.typeUrl = \`\${Any.prefix}\${id}\`;
        this.value = msg.serializeBinary();
      }
    `);
  }

  printToProtobufJSON(printer: Printer) {
    printer.addLine(`
      if (!options?.messagePool) {
        throw new Error(\`Message pool is required to cast Any to JSON\`);
      }

      const msg = this.unpack(options.messagePool);

      if (!msg) {
        return { '@type': this.typeUrl! };
      }

      const json = msg.toProtobufJSON(options);

      if (typeof json !== 'object') {
        return { '@type': this.typeUrl!, value: json };
      }

      return { ...json, '@type': this.typeUrl! };
    `);
  }

  printAsProtobufJSON(printer: Printer) {
    printer.addLine(`export type AsProtobufJSON = {
      '@type': string;
      value?: string;
      [prop: string]: any;
    };`);
  }

}
