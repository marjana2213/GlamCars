PGDMP       	            	    |            CarsDB    16.3    16.3 #    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16398    CarsDB    DATABASE     |   CREATE DATABASE "CarsDB" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Russian_Russia.1251';
    DROP DATABASE "CarsDB";
                postgres    false            �            1259    16399    baskets    TABLE     �   CREATE TABLE public.baskets (
    id bigint NOT NULL,
    person_id bigint NOT NULL,
    product_id bigint NOT NULL,
    number bigint NOT NULL,
    product_type character varying(64) NOT NULL
);
    DROP TABLE public.baskets;
       public         heap    postgres    false            �            1259    16402    baskets_number_seq    SEQUENCE     �   ALTER TABLE public.baskets ALTER COLUMN number ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.baskets_number_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    215            �            1259    16403    cars    TABLE     1  CREATE TABLE public.cars (
    car_id bigint NOT NULL,
    brand character varying(128) NOT NULL,
    model character varying(128) NOT NULL,
    color character varying(128) NOT NULL,
    date integer NOT NULL,
    body character varying(128) NOT NULL,
    power integer NOT NULL,
    transmition character varying(128) NOT NULL,
    engine character varying(128) NOT NULL,
    unit character varying(128) NOT NULL,
    country character varying(128) NOT NULL,
    price integer NOT NULL,
    sale boolean NOT NULL,
    photo character varying(255) NOT NULL
);
    DROP TABLE public.cars;
       public         heap    postgres    false            �            1259    16408    cars_cars_id_seq    SEQUENCE     �   ALTER TABLE public.cars ALTER COLUMN car_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.cars_cars_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    217            �            1259    16409    items    TABLE     �   CREATE TABLE public.items (
    id bigint NOT NULL,
    name character varying(250) NOT NULL,
    description text,
    price integer NOT NULL,
    sale boolean NOT NULL,
    photo character varying(255) NOT NULL
);
    DROP TABLE public.items;
       public         heap    postgres    false            �            1259    16414    items_id_seq    SEQUENCE     �   ALTER TABLE public.items ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.items_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    219            �            1259    16415    orders    TABLE     �   CREATE TABLE public.orders (
    id bigint NOT NULL,
    payment_date timestamp with time zone,
    basket_id bigint NOT NULL
);
    DROP TABLE public.orders;
       public         heap    postgres    false            �            1259    16418    orders_id_seq    SEQUENCE     �   ALTER TABLE public.orders ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.orders_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    221            �            1259    16419    persons    TABLE     p  CREATE TABLE public.persons (
    id bigint NOT NULL,
    email character varying(128) NOT NULL,
    first_name character varying(128) NOT NULL,
    last_name character varying(128) NOT NULL,
    middle_name character varying(128),
    password character varying(128) NOT NULL,
    telephone character varying(128) NOT NULL,
    role character varying(64) NOT NULL
);
    DROP TABLE public.persons;
       public         heap    postgres    false            �            1259    16424    persons_id_seq    SEQUENCE     �   ALTER TABLE public.persons ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.persons_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    223            �            1259    16425    tokens    TABLE     �   CREATE TABLE public.tokens (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    token character varying(512) NOT NULL,
    date timestamp without time zone
);
    DROP TABLE public.tokens;
       public         heap    postgres    false            �            1259    16430    tokens_id_seq    SEQUENCE     �   ALTER TABLE public.tokens ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.tokens_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    225            �          0    16399    baskets 
   TABLE DATA           R   COPY public.baskets (id, person_id, product_id, number, product_type) FROM stdin;
    public          postgres    false    215   �'       �          0    16403    cars 
   TABLE DATA           �   COPY public.cars (car_id, brand, model, color, date, body, power, transmition, engine, unit, country, price, sale, photo) FROM stdin;
    public          postgres    false    217   (       �          0    16409    items 
   TABLE DATA           J   COPY public.items (id, name, description, price, sale, photo) FROM stdin;
    public          postgres    false    219   �*       �          0    16415    orders 
   TABLE DATA           =   COPY public.orders (id, payment_date, basket_id) FROM stdin;
    public          postgres    false    221   �@       �          0    16419    persons 
   TABLE DATA           k   COPY public.persons (id, email, first_name, last_name, middle_name, password, telephone, role) FROM stdin;
    public          postgres    false    223   A       �          0    16425    tokens 
   TABLE DATA           :   COPY public.tokens (id, user_id, token, date) FROM stdin;
    public          postgres    false    225   �B       �           0    0    baskets_number_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.baskets_number_seq', 153, true);
          public          postgres    false    216            �           0    0    cars_cars_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.cars_cars_id_seq', 60, true);
          public          postgres    false    218            �           0    0    items_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.items_id_seq', 15, true);
          public          postgres    false    220            �           0    0    orders_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.orders_id_seq', 97, true);
          public          postgres    false    222            �           0    0    persons_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.persons_id_seq', 23, true);
          public          postgres    false    224            �           0    0    tokens_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.tokens_id_seq', 35, true);
          public          postgres    false    226            4           2606    16432    baskets baskets_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.baskets
    ADD CONSTRAINT baskets_pkey PRIMARY KEY (number);
 >   ALTER TABLE ONLY public.baskets DROP CONSTRAINT baskets_pkey;
       public            postgres    false    215            6           2606    16434    cars cars_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.cars
    ADD CONSTRAINT cars_pkey PRIMARY KEY (car_id);
 8   ALTER TABLE ONLY public.cars DROP CONSTRAINT cars_pkey;
       public            postgres    false    217            8           2606    16436    items items_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.items
    ADD CONSTRAINT items_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.items DROP CONSTRAINT items_pkey;
       public            postgres    false    219            :           2606    16438    orders orders_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_pkey;
       public            postgres    false    221            <           2606    16440    persons persons_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.persons
    ADD CONSTRAINT persons_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.persons DROP CONSTRAINT persons_pkey;
       public            postgres    false    223            >           2606    16442    tokens tokens_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.tokens
    ADD CONSTRAINT tokens_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.tokens DROP CONSTRAINT tokens_pkey;
       public            postgres    false    225            ?           2606    16443    tokens user_id_fkey    FK CONSTRAINT     t   ALTER TABLE ONLY public.tokens
    ADD CONSTRAINT user_id_fkey FOREIGN KEY (user_id) REFERENCES public.persons(id);
 =   ALTER TABLE ONLY public.tokens DROP CONSTRAINT user_id_fkey;
       public          postgres    false    225    4668    223            �   *   x�3�42�44�445��q��2	�X�9���b���� zO6      �   �  x�Ŗ�n�@��'O����'�tW����Z,:m��`��v�ݵ�@P`���+�D�7R^a�F_Ԧ�ĩ��8���\>���ĴᎳމ`�!�o�N����+}h�_��l�>��@#����N��dK��=��	�۠��=�|����6���}��������q�+���7����-�I_C+���ժ�)�D�4���
��=��ݬ
��(R><PQ�r���l�{ܷ� 2��)�MM��#[�.@Ư����&�.a�4�d�xO����p����3��V~�q��ʬ��+���S��%o�>����g�_��C6�SI-)E�����\s�n�qX`�fgtS$yQ�v��46��(C�5ϐ���`#���,�n�(��%,6�(��a�����_��[<��Ğ���;�O��%/
�^��-Ԩ�	H"mVF�l�3Z��ʸ���h^9��_�8�փ��ƥd%���53��4�F�L��Q�_c�D�ِk�&8g����*�TYj�6�k��n3�Ki�J9:��C�|c^կ02���-J�4s@1T ����GNL�ˢ�����ˡ�bL�MǸ:X,�i�,v�3Hg�	L-��N��<7Rub��P�K����<��"�.m0V^����Ֆ�@JJr-�Ur��඗�bY�Gb|�ˌ��T�R�3w�      �      x��[[sWr~���C��
 �NP��V�-F4�EҊ��/�FY+�J.��d�x1u	e����"[�-Uj�����C��!�$�_�9g���n�UfΥO_���g.Fݨ;ڍ���7:�D��V4�G�&jF��vtF�Q���������~��Mcaeqai���k�b�`�'���)�&�eM��$�FA֔
����3ׯ4r����h(����p�c���6��.�������$|��·�����~�cQ���z|/=ț����I��Ŭ�+�'t��qK����Ƿ�o��?��`� �D�#�GI���uEG<7�J�E�c��y& �'^�>���,k?o���<T"Y��}��EC3ړ��Hh7��Cs�o�x��Q��V�mфgvB:el���@��,E��d�i�ԡ���d$g�_XIHJ�x�;҃I�~�L�89��s��	�H��]�ˊxh�D�84�*I�(O��C+���ǳ��2��$iާ��5�ݧ�iS��>cM0~Ux�A�tI�+c�����ђ��O::`9�ߎ]�C,b{W��0�/���-��P�S���٦��CH��I+>YS̙~�Z�j`*�]8ݧ�>��H�P�{�˸�/�s!�+���Lp�z�"Y��,$6�q���4�@O�����֣��x���r�2~B��X?(t� $���S`�aK]��KX%�B�Ȗ����a�-�O�Ϧë�!B��Y�K�7q�� �N�]�j�1���m�ő�r�lܴ����{f��Ճ��M�qdˣG��"~����tYo��ͳ?؃��u/$��%o��j��;|j�X"Yұa��?&�~�����Yb$�=,r ��7N=��xā ��YǮ�#k�օH���#N��\7�"���a��|Ѩ�a!�s!'��X{�
SmM��+���d�X�*%��11�o��� k<�	�3�I��C��҅�E�ʙ��3�b��!��6n�� .pv����0'N�=N��m���5��w�HM��Δ�mS�(��P7���.[��P����ƒ��8��;���^���3��Ǧ����X����[K�+�)Ε*���'���]��ٸ����On�y�L�|�����gj��j�V)��񳟿3���6���!"єb�-�;3b�B��YY����=N���4n�ٸy�i|��+T��c�1�`:!��#�N��5pG'�(����_	�|��B��pp������WL.�L�� z���Z�ӗ���8K�V��P P�~>6>�e�]hlY��,�G�۲uh��ȎŃ�v$��U2^Y��M�	����8t�bu۪�]v���|i␻�D�c�����\���K�Z�
�g�����;�^}&xjZ.z`�]@�qǼ���6M9zm���M���o����Y�O���F�q[�����MOT��&^�ⷠ�+_p�
�,�Ԙ/w��(�T=%�c�i };j[���*cB~�\��H�l-��j1�{xr�ФYu~@t��p�e�>�C�E��,29?4Aɴx�,��iβ�|��!�#ƏQ��Z��3-�����j�| d�&Y޶w�2gJ����-��Ј����xW�w'Pk��#}\��b̧@| Pdܡ�L��n�N�5�g�hg����_���)`�i;� %��=��FE7����u�*]�� �/�D 7�g���R�!㵌j��/�b�{��Tӳc���&d��cn�2�[p?�~Fd��I�Kx��[Bn�qc�'�G�z�RP�t_�M6��|�r�}L�X��01F�������i�x��a���5A�6
��%ĕ��{P�F�����4���h�c��$N5�c�C���z����B��M"&�by�+�偏�<OG���l)E}t��k멸�f���Ve�#u6r��H�J^r6���y,�®@��׬�܋�:���獺3uQ{&�L8͇)f��.�F;��b`�$��q��J��<8�IAnd �&w)=�AIȌ tw����0�w�CG�@ߏ$"�8 �D	vnc}2P�<	�@�N|�y�����t��`���s�w���t�>%A��I���R�QY���;���0���w���k��e��&K���kj	�T��s�@ɽc�2�D�Mт��H,�`�`$|�n�C�9��S�h�l' !���_���|ڃ�а�@;��u�y�X� �	6�XO*ϚTJ��4�a���-�f��� ��@��5{��!���Ȟfy��h��@/�C5�����j�ù��4k4��`�R�JԳ���o�Uu+��u�Gz��_��W�Z5�ˮG���4��	�m�D&�=�K>S��='�-Tk�jU�b������������J;\[i��fl R�K�2A4���Q.��s�B,�E���Cj���M���B����:��6�g�����'�����fb��H��*^z%��afu���K���_��:6�54>��n��hG���G
�[�ZP��S����=]p��u%:��?�S���r�^�C51�3�S7���z�)r`�� ��>9.�r�,z(�p6V9sQ���S7�J9K����qlւ�樇H�? I�$�e���q�$`�KEo�����(X�|����k��4�$�����'�UV@�tP�x�6���!���<)�	eD��Z�RQ��BZ��D��+/��U��x|�Q���d�h��m-�M�I�+������'���]C������D�rF��.J`C�Ƀ�S2��|߲dwYu�C�Z�t�U��ϕ���r&�OuK��Kf��+��j�ڵ�O����:��uS*Wg*U�R*�/Y3-�aD%�A���V�&�[ΙJ��QV�t�{���a�X��n�n�e�ap��b$��X�)�m�}��vA2В�n?*E�yάq*w�>g���}ϕ���[�?��~+���;7>�}�����ظysss�"M��/s$�\���S*p����ˆ�P��C�eH$-j��бT�5O,�+�3�|mѬ��X�s������1s�Ɲ�����?3�AYĝuS��fJ���r������W�������ӛ8p\2W��һ��K����Z㲙_l,��Ї���e����XYX�l��/.��ͯ\6��tsce~�._�����4֖/����:����ʏ~���-��;}����a�H�'(��/�b�(��P����>��}��G;t{�� �f1C��L-�%��.�/�j��&��>��\;,:
QZ���8ǁ�
�uǱ�3��%<.����x?-�*��>�DSm��g*��s�J�P�J5A��W^��X4���w�,/���Y)�?X�L�X�A*������,7��2�����H����|LPA��a�U�-�P���0,�iy{��8�k���P8:'*�mX�����n�TCW~Q�oq�C[��s<O��.HktJM^�P�门��1��BMҰcJ�w�n�+��!�wF4���ۅ �@"�5����"��PSL�/(�
�ք�-H�g � �:T�/4Rdy�P+z�w�����i�xh	_��S�H;~d!a�[�����m]ή�pO=qӚ(L�V�����Q<�y�T~��W+�չZE�[�+��@�ɍ\g�ϓm�+��m���~g�+���\���d�,sX�R��S�+.�q����~�]��䍯��m��ź5�qvn���`[4[��3���((y��%�j���2���s�:����x!��-k<M]c�w��c)̜����D-�ؓ��U�Ps�5 j�"=��2��b��Jc�?�q�i|�T�ͮ�9��k��S���>��@|��^G���Cu��^�w��3#��g!��o���}uC�/��(C�R��R(��@��1Z9s����$�v5ഀ%�9�lR���Ց�ʦe�!�7����;ͷ����e������g�k�cȼ�T�[g,v�z>-�����b��[
��S�]�4N�	�i)󾤥!��T�y#i�E�Ņ�@/b���� �  ��y�]����-?�^'�C=�.�C�3����kbG`q�	, �khZ�=�� <s۵�;|L�u�8Ɂ%:8��S�?�Ŷ����tq����글��e�:T��S��c����!����|�y�E�C�������}���[%u9%w��\h!��Ӷ�'t��#)��@����(6�}˘ ��q��"ow�dj,/�H�f
���BrlR/H��#]{)����d��~|I��!y���'��Ƿ�ѥ���X���[���Uɣ�`
�aA�rM�-Ŀ+�+��Lj7!�#��[�5)�=����``kDQ� %zc��9��Nے2gc�������i�/��5<�����*{�*�$�=ň��o	m�H��/�j��(��^G	�D�YZM
pα�B����JG��-J�Y���t�p�2a1W��'�Dt!����#*���5 U9d��>��#���eg=���M�h)}��S�'��z��p��`�vlȐm8J�g�ԏ3�r�M�I�9���Y�~�y�Py��L}�P8'w.˵����E�f�_��8g��퍍�Յ\�^���	�����JI;�x�Ʊ"��;j���以I��#Y=��:�v����
$,��2��y!����aZ%�N;�|�J��c��A�f�1�라i2Yg�g��j��^g���Z(�dў���nd+$�ǌ7k��K��w��,�^7�<l\LVA��5�R��L�\]X3�@3LrNN;�XƧ�y� ��@
�Q��#�tW0��W��$�ZKؒ��&۵1�];C�jA�n��F���͞��I�1� '��ί���#I!�RR��e)��b!Oa�w�:Ì�1�Dm��z��b��zKG��(ڂ^B�lY�ϐGÆ��!�D8%R����U)~$��zѕr�GF��H{�}�\����D� Q��%����"^d�5�x�lR��
7�޴��G2�f�������@s�j׉�[�◑ޜ�;K���$���h���~�1jeB�9����T����-��%�O�Tȅ΋�Ufk�R%W��?ÍT3���`�6���O����X����d\K}���Bc#!Ï�$h��J��Z��g�����J��1��&���r�P�A�VES*V�����'*�QJC;�;0�ٱ3�ݱ�۰&���g���e��(�|ˮ�n��Jk@��^�Jk�r����!{��tqi�<#B�Q:�0Y��ؕ]��\����������������
����V��@���潻��n���eӉjNӛ�/-�m+9���#}9h�+�g��z�b�T+Ԫs�"KJ��#y�xyaqe���kF^N.�=:�A�n�_��Z����T��ʏ�4n���3�5ce����� �8�S��A8�N�T�-ŬhR��D�dG���K�O���֤�Z�qj+w�3�`%�P�@����=!��d#5J�ɥ�Z�}&�6Z������'�I�auhm@�k��J����N������>m�x��\;O���z�<+Ň������:�U      �   0   x��4�4202�54�52S0��25�22г47042�60�4����� ��      �   �  x�e�A��@������P���R���.jzqTuA�Ӧ�f/M��zh�c�f�M�m��0|�*�n�v/�?3����$mk�Cn�����=��d�Ozw2Ї��ba��-����c����@������䷍y���������	��]_�t�2���y�Ȁ�M /� ������C�����ºU䎕n�x)���İ:;��F:v#�U�3g�KX�y�U����� �#��
-@
w��N��Pj[��zi��%s8�+U���	���f�p�w�ޜ�7��u5�v.��Q)�"�7,�#@ <���Q�5<d�P�����h"iP;�Lq�I�Y��LGM�M�t�V�z ����/\AZ�A�7�AJ�5z��'�ϯ�w��C�{@��{�-������!�9t��~/����dg��1�Z့��r�u��GV��Wwcd���X�j�n����W�I�k�a�_\+�n      �   �  x����r�@���y(f�!
a0 b�?F~�J��/�Y�\e5��N����Aa��,6�|�[x�c���GOJ4<��iK5K�%�@�maU��+'��ۚUG[�Ou��b��A�Tj�U��-��>Z �m��J�[��=���)ܺ��X"R,{����U�!2�O:җ��P1�*d�)�C��+5�:p��w+;��Ug�F�J5���A���� ���x4�&p��DO^���mC��+M��*�S�k�%�)���5�Y!z��.s��	�vn��n��a��F�k-
ta�qwz,��\-�w��7�'8f~q��+�!�CK6ח����i�Kx��mq����+f��HI2��'o@�!4C��2h������?�D�w����eTW�x�/0̽%�|v�����+���hm��f������.�m��3v�n"b��^T��O�:`R�=��a�ȭp9��@H��"O��+���x����     